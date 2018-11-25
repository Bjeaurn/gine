import { Canvas } from './canvas'
import { Config } from './config'
import { Gine } from './core'
import { Asset, ImageAsset, SpriteAsset } from './image'
import { Font } from './text'

export class Handle {
  public readonly handle: CanvasRenderingContext2D
  constructor(private canvas: Canvas) {
    this.handle = this.canvas.canvasElm.getContext(
      '2d'
    ) as CanvasRenderingContext2D
    this.scale(this.canvas.scale)
  }

  public clear() {
    this.handle.clearRect(-1, -1, Gine.CONFIG.width + 1, Gine.CONFIG.height + 1)
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
      x < Gine.CONFIG.viewport.maxX &&
      x > Gine.CONFIG.viewport.minX &&
      y < Gine.CONFIG.viewport.maxY &&
      y > Gine.CONFIG.viewport.minY
    ) {
      this.handle.drawImage(image.image, x, y)
    }
  }

  public drawSprite(image: SpriteAsset, x: number, y: number, index?: number) {
    if (index) {
      image.calculatePerIndex(index)
    } else {
      image.draw()
    }
    this.handle.drawImage(
      image.image,
      image.sourceX,
      image.sourceY,
      image.sizeX,
      image.sizeY,
      x,
      y,
      image.sizeX,
      image.sizeY
    )
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
