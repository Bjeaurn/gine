import { Handle } from './handle'
import { Config, CONFIG } from '../config'

export class Canvas {
    readonly canvas: HTMLCanvasElement
    readonly _handle: Handle

    readonly width: number
    readonly height: number

    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas

        this.canvas.oncontextmenu = function (){
            return false
        }
        this.canvas.onselectstart = () => false
        this.canvas.onmousedown = () => false
        this.canvas.width = CONFIG.width
        this.canvas.height = CONFIG.height

        this.width = CONFIG.width
        this.height = CONFIG.height

        this._handle = new Handle(<CanvasRenderingContext2D>this.canvas.getContext("2d"))
    }

    get handle() {
        return this._handle
    }

    clear() {
        this.handle.clear()
    }
}