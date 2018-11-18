import { Gine } from './core'

export class Canvas {
  public readonly canvasElm: HTMLCanvasElement

  public readonly width: number
  public readonly height: number
  public readonly tilesX: number | undefined
  public readonly tilesY: number | undefined
  public scale: { x: number; y: number } = { x: 0, y: 0 }

  constructor(canvas: HTMLCanvasElement) {
    window.addEventListener('resize', listener => {
      this.resize()
    })
    this.canvasElm = canvas

    this.canvasElm.oncontextmenu = () => {
      return false
    }
    this.canvasElm.onmousedown = () => false
    this.canvasElm.width = Gine.CONFIG.width
    this.canvasElm.height = Gine.CONFIG.height

    this.width = Gine.CONFIG.width
    this.height = Gine.CONFIG.height

    if (Gine.CONFIG.usesTiles) {
      this.tilesX = Math.round(this.width / Gine.CONFIG.tileSize)
      this.tilesY = Math.round(this.height / Gine.CONFIG.tileSize)
    }

    this.resize()
  }

  public resize() {
    const width = window.innerWidth
    const height = window.innerHeight

    this.scale.x = width / Gine.CONFIG.width
    this.scale.y = height / Gine.CONFIG.height
    if (this.scale.x > this.scale.y) {
      this.canvasElm.height = height
    } else {
      this.canvasElm.width = width
    }
    this.canvasElm.width = width
    this.canvasElm.height = height
  }
}
