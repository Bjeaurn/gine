import { Handle } from './handle'
import { Config, CONFIG } from './config'

export class Canvas {
    readonly canvas: HTMLCanvasElement
    readonly _handle: Handle

    readonly width: number
    readonly height: number
    readonly tilesX: number | undefined
    readonly tilesY: number | undefined
    private scale: number = 0

    constructor(canvas: HTMLCanvasElement) {
        window.addEventListener('resize', (listener) => {
            this.resize()
        })
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

        if(CONFIG.usesTiles) {
            this.tilesX = Math.round(this.width / CONFIG.tileSize)
            this.tilesY = Math.round(this.height / CONFIG.tileSize)
        }

        this._handle = new Handle(<CanvasRenderingContext2D>this.canvas.getContext("2d"))
        
        this.resize()
    }

    get handle() {
        return this._handle
    }

    clear() {
        this.handle.clear()
    }

    resize() {
        const width = window.innerWidth
        const height = window.innerHeight

        this.scale = Math.min(width / CONFIG.width, height / CONFIG.height)
        this.canvas.width = width
        this.canvas.height = height
        this.handle.scale(this.scale)
    }
}