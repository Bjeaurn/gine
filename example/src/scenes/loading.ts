import { Gine, IScene, Scene, ImageAsset, SpriteAsset } from 'gine'

export class LoadingScene extends Scene {
  x: number = 0
  y: number = 0
  directionX: number = 1
  directionY: number = 1
  image: ImageAsset
  test: SpriteAsset
  count: number = 0

  constructor() {
    super()
    this.image = Gine.store.get('logo') as ImageAsset
    this.test = Gine.store.get('player') as SpriteAsset
  }

  tick() {
    if (this.x > Gine.CONFIG.width - this.image.width) {
      this.directionX = 0
    } else if (this.x < 0) {
      this.directionX = 1
    }

    if (this.directionX === 1) {
      this.x++
    } else {
      this.x--
    }

    if (this.y > Gine.CONFIG.height - this.image.height) {
      this.directionY = 0
    } else if (this.y < 0) {
      this.directionY = 1
    }

    if (this.directionY === 1) {
      this.y++
    } else {
      this.y--
    }

    if (this.count > 1000) {
      // this.destroy()
      this.count = 0
    }
    this.test.update()
  }

  frame() {
    Gine.handle.draw(Gine.store.get('logo'), this.x, this.y)
    Gine.handle.drawSprite(this.test, 200, 200)
    this.count++
  }
}
