import { Canvas } from './canvas'
import { DEFAULT_CONFIG } from './config'
import { Gine } from './core'
import { Asset, ImageAsset, SpriteAsset } from './image'
import { Font } from './text'

export class Handle {
  public readonly handle: CanvasRenderingContext2D
  constructor(private canvas: Canvas) {
    this.handle = this.canvas.canvasElm.getContext(
      '2d'
    ) as CanvasRenderingContext2D
    // console.log(this.canvas.scale)
    this.handle.scale(this.canvas.scale.x, this.canvas.scale.y)
  }

  public clear() {
    this.handle.clearRect(0, 0, DEFAULT_CONFIG.width, DEFAULT_CONFIG.height)
  }

  public text(value: string | number, x: number, y: number) {
    this.handle.fillText(value as string, x, y)
  }

  public setFont(font: Font) {
    this.handle.font = font.toString()
  }

  public setColor(red: number, green: number, blue: number, alpha?: number) {
    if (!alpha) {
      alpha = 1.0
    }
    this.handle.fillStyle =
      'rgba(' + red + ',' + green + ',' + blue + ',' + alpha + ')'
  }

  public draw(image: Asset, x: number, y: number) {
    if (
      x < DEFAULT_CONFIG.viewport.maxX &&
      x > DEFAULT_CONFIG.viewport.minX &&
      y < DEFAULT_CONFIG.viewport.maxY &&
      y > DEFAULT_CONFIG.viewport.minY
    ) {
      this.handle.drawImage(image.image, x, y)
    }
  }

  public rotateImage(image: Asset, degrees?: number) {
    if (!degrees) {
      degrees = 0
    }
    const radians = (degrees * Math.PI) / 180
    // COME BACK TO THIS LATER, FIGURE OUT THE `BUFFERHANDLE`
  }

  public resetColor() {
    this.setColor(0, 0, 0)
  }

  public scale(scale: number) {
    this.handle.scale(scale, scale)
  }
}
