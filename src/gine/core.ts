import { interval, merge, Observable, Subscription, Subject } from 'rxjs'
import { map, share } from 'rxjs/operators'
import { Canvas } from './canvas'
import { Config, DEFAULT_CONFIG } from './config'
import { Handle } from './handle'
import { IScene } from './scene'
import { Store } from './store'
import { Font } from './text'
import { asapScheduler } from 'rxjs'

export type TickTypes = 'tick' | 'frame' | 'second'

export class Gine {
  public static readonly CONFIG: Config
  public static canvas: Canvas
  public static handle: Handle
  public static store: Store
  public static events: Observable<string>
  public static eventsSubject: Subject<string> = new Subject<string>()
  public static sendEvent(event: string) {
    Gine.eventsSubject.next(event)
  }
  public fps: number = 0
  public readonly fpsMs: number
  public readonly tickMs: number
  public readonly update$: Observable<TickTypes>
  public readonly clock$: Observable<number>
  private frameCount: number = 0
  private delta: number = 0
  private tickrate: number = 0
  private tickNr: number = 0
  private then: number
  private second: number
  private scene: IScene | null
  private updateSubscription: Subscription

  constructor(readonly config: Config) {
    if (this.config.canvas === null) {
      throw new Error('No canvas given!')
    }
    ;(Gine.CONFIG as Config) = this.config
    Gine.events = Gine.eventsSubject.asObservable().pipe(share())
    Gine.canvas = new Canvas(Gine.CONFIG.canvas as HTMLCanvasElement)
    Gine.handle = new Handle(Gine.canvas)
    Gine.store = new Store()

    // Would be default values, but compiler does not agree. `performance` not available yet.
    this.second = performance.now()
    this.then = this.second

    this.fpsMs = 1000 / Gine.CONFIG.maxFps
    this.tickMs = 1000 / Gine.CONFIG.tickRate

    Gine.handle.setFont(new Font('Helvetica', 16))
    Gine.handle.setColor(0, 0, 0, 0.8)

    const ticks = interval(this.tickMs).pipe(map(() => 'tick')) as Observable<
      TickTypes
    >
    const frames = interval(this.fpsMs).pipe(map(() => 'frame')) as Observable<
      TickTypes
    >
    const seconds = interval(1000).pipe(map(() => 'second')) as Observable<
      TickTypes
    >

    this.update$ = merge<TickTypes>(ticks, frames, seconds).pipe(share())
  }

  // Thought: Scenes are not in the library, so they are in the game implementation:
  // So they might have access to a static Gine var, that we can reuse.
  // Not sure if it works though.

  // Thought: Might want to have some more stuff as statics, like Text and Keyboard/Mouse
  // under the Gine core.

  public changeScene(scene: IScene) {
    this.scene = scene
    if (this.scene && this.scene.init) {
      this.scene.init()
    }
  }

  public start() {
    this.updateSubscription = this.update$.subscribe(t => this.fn(t))
  }

  public stop() {
    this.updateSubscription.unsubscribe()
  }

  public frame(): void {
    Gine.handle.clear()
    Gine.handle.setColor(0, 0, 0)
    if (this.scene && this.scene !== null && this.scene.frame) {
      this.scene.frame()
    }

    Gine.handle.setFont(new Font('Helvetica', 10))
    Gine.handle.setColor(0, 255, 0)
    Gine.handle.text('' + this.fps + 'fps', 5, 16)
    Gine.handle.text('' + this.tickrate + ' tickrate', 5, 40)

    this.frameCount++
    // window.requestAnimationFrame(() => {})
  }

  public tick(): void {
    this.tickNr++
    this.delta = (performance.now() - this.then) / 1000
    this.then = performance.now()
    if (this.scene && this.scene !== null && this.scene.tick) {
      this.scene.tick()
    }
  }

  private fn(type: TickTypes): void {
    if (type === 'frame') {
      this.frame()
    }
    if (type === 'tick') {
      this.tick()
    }
    if (type === 'second') {
      this.updateRateData()
    }
  }

  private updateRateData() {
    this.fps = this.frameCount
    this.tickrate = this.tickNr
    this.frameCount = 0
    this.tickNr = 0
    if (this.scene && this.scene !== null && this.scene.second) {
      this.scene.second()
    }
  }
}
