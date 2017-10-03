import { Handle } from './gine/handle'
import { Font } from './gine/text'
import { CONFIG, Config } from './config'
import {Observable, Subscription} from 'rxjs'
import { Canvas } from "./gine/canvas";

export class Main {

    readonly canvas: Canvas
    readonly handle: Handle
    public fps: number = 0
    private frameCount: number = 0
    private delta: number = 0
    private then: number = performance.now()
    private second: number = performance.now()
    readonly fpsMs: number
    readonly tickMs: number

    readonly update$: Observable<string>

    constructor(readonly config: Config) {
        this.canvas = new Canvas(<HTMLCanvasElement>document.getElementById(this.config.canvasId))
        this.handle = this.canvas.handle
        this.fpsMs = 1000 / this.config.MAXFPS
        this.tickMs = 1000 / this.config.tickRate

        this.canvas.handle.setFont(new Font('Helvetica', 16))
        this.canvas.handle.setColor(0,0,0,0.8)

        this.update$ = Observable.interval(this.tickMs)
            .map(() => 'tick')
            .merge(
                Observable.interval(this.fpsMs)
                    .map(() => 'frame')
            )
            .share()

        this.update$.subscribe(
            t => this.fn(t)
        )
    }

    fn(type: string) {
        if(type === 'frame') this.frame()
        if(type === 'tick') this.tick()
    }

    frame(): void
    {
        // @TODO: Fix the FPS counter.
        this.frameCount++
        this.handle.clear()
        this.handle.text(""+this.fps+'fps', 5, 16)
        this.handle.text(""+this.delta+' delta', 5, 40)
        if(this.frameCount > CONFIG.MAXFPS) this.frameCount = 0  
        window.requestAnimationFrame( () => {} )
    }

    tick() {
        this.delta = ( performance.now() - this.then) / 1000        
        this.fps = Math.round(this.frameCount / this.delta)
        this.then = performance.now()
    }
}

const app = new Main(CONFIG)
window.requestAnimationFrame(this.frame())