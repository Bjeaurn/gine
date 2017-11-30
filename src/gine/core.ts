import { Font } from './text';
import { Handle } from './handle'
import { Canvas } from './canvas'
import { CONFIG, Config } from './config'
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/map'
import 'rxjs/add/observable/merge'
import 'rxjs/add/observable/interval'
import 'rxjs/add/operator/share'

export class Gine {

    readonly canvas: Canvas
    readonly handle: Handle
    public fps: number = 0
    private frameCount: number = 0
    private delta: number = 0
    private tickrate: number = 0
    private tickNr: number = 0
    private then: number = performance.now()
    private second: number = performance.now()
    readonly fpsMs: number
    readonly tickMs: number

    readonly update$: Observable<string>
    private updateSubscription: Subscription
    readonly clock$: Observable<number>

    constructor(readonly config: Config) {
        if(this.config.canvas === null) {
            throw new Error("No canvas given!");
        }
        this.canvas = new Canvas(this.config.canvas)
        this.handle = new Handle(this.canvas.canvasElm)
        this.fpsMs = 1000 / this.config.maxFps
        this.tickMs = 1000 / this.config.tickRate

        this.handle.setFont(new Font('Helvetica', 16))
        this.handle.setColor(0,0,0,0.8)

        const ticks = Observable.interval(this.tickMs).map(() => 'tick')
        const frames = Observable.interval(this.fpsMs).map(() => 'frame')
        const seconds = Observable.interval(1000).map(() => 'second')

        this.update$ = Observable.merge(ticks, frames, seconds)
            .share()
    }

    start() {
        this.updateSubscription = this.update$.subscribe(
            t => this.fn(t)
        )
    }

    stop() {
        this.updateSubscription.unsubscribe()
    }

    fn(type: string): void {
        if(type === 'frame') this.frame()
        if(type === 'tick') this.tick()
        if(type === 'second') {
            this.fps = this.frameCount
            this.tickrate = this.tickNr
            this.frameCount = 0
            this.tickNr = 0
        }
    }

    frame(): void {
        this.handle.clear()
        this.handle.setColor(0,0,0)
        this.handle.handle.fillRect(1, 1, CONFIG.width-2, CONFIG.height-2)
        this.handle.setFont(new Font('Helvetica', 10))
        this.handle.setColor(0, 255, 0)
        this.handle.text(""+this.fps+'fps', 5, 16)
        this.handle.text(""+this.tickrate+' tickrate', 5, 40)
        this.frameCount++
        window.requestAnimationFrame( () => {} )
    }

    tick(): void {
        this.tickNr++
        this.delta = ( performance.now() - this.then) / 1000        
        this.then = performance.now()
    }
}

