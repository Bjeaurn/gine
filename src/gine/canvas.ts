import { Gine } from './core'

export class Canvas {
  public readonly canvasElm: HTMLCanvasElement

  public readonly width: number
  public readonly height: number
  public tilesX: number | undefined
  public tilesY: number | undefined
  public scale: number = 0

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
    this.scale = Math.min(
      width / Gine.CONFIG.width,
      height / Gine.CONFIG.height
    )

    this.canvasElm.height = height
    this.canvasElm.width = width
    if (Gine && Gine.handle && Gine.handle.scale) {
      Gine.handle.scale(this.scale)
    }

    if (Gine.CONFIG.usesTiles) {
      this.tilesX = Math.round(this.width / Gine.CONFIG.tileSize)
      this.tilesY = Math.round(this.height / Gine.CONFIG.tileSize)
    }
  }
}
