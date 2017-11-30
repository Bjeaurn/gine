import { Config, CONFIG } from './config'

export class Canvas {
    readonly canvasElm: HTMLCanvasElement

    readonly width: number
    readonly height: number
    readonly tilesX: number | undefined
    readonly tilesY: number | undefined
    private scale: number = 0

    constructor(canvas: HTMLCanvasElement) {
        window.addEventListener('resize', (listener) => {
            this.resize()
        })
        this.canvasElm = canvas

        this.canvasElm.oncontextmenu = function (){
            return false
        }
        this.canvasElm.onselectstart = () => false
        this.canvasElm.onmousedown = () => false
        this.canvasElm.width = CONFIG.width
        this.canvasElm.height = CONFIG.height

        this.width = CONFIG.width
        this.height = CONFIG.height

        if(CONFIG.usesTiles) {
            this.tilesX = Math.round(this.width / CONFIG.tileSize)
            this.tilesY = Math.round(this.height / CONFIG.tileSize)
        }

        this.resize()
    }

    resize() {
        const width = window.innerWidth
        const height = window.innerHeight

        this.scale = Math.min(width / CONFIG.width, height / CONFIG.height)
        this.canvasElm.width = width
        this.canvasElm.height = height
        // TODO Fixme.
        // this.handle.scale(this.scale)
    }
}