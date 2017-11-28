import { SpriteAsset } from './gine/image'
import { Handle } from './gine/handle'
import { Font } from './gine/text'
import { CONFIG, Config } from './config'
import { Observable, Subscription } from 'rxjs'
import { Canvas } from "./gine/canvas"
import { Keyboard } from './gine/keyboard'
import { Mouse } from "./gine/mouse"
import { Camera } from './gine/camera'


const sprite = new SpriteAsset('test', 'sprites/coin-sprite-animation-sprite-sheet.png', { widthPerImage: 1, heightPerImage: 1 })


export class Main {

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
        this.canvas = new Canvas(<HTMLCanvasElement>document.getElementById(this.config.canvasId))
        this.handle = this.canvas.handle
        this.fpsMs = 1000 / this.config.maxFps
        this.tickMs = 1000 / this.config.tickRate

        this.canvas.handle.setFont(new Font('Helvetica', 16))
        this.canvas.handle.setColor(0,0,0,0.8)

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

        sprite.draw()
        window.requestAnimationFrame( () => {} )
    }

    tick(): void {
        this.tickNr++
        this.delta = ( performance.now() - this.then) / 1000        
        this.then = performance.now()
    }
}

const app = new Main(CONFIG)
app.start()
const camera = new Camera()
const keyboard = new Keyboard(app.canvas.canvas)
const mouse = new Mouse(app.canvas.canvas)

