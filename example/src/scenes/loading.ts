import { Gine, IScene, Scene, ImageAsset, SpriteAsset, KEYCODES } from 'gine'

export class LoadingScene extends Scene {
  x: number = 0
  y: number = 0
  spriteX: number = 200
  spriteY: number = 200
  directionX: number = 1
  directionY: number = 1
  image: ImageAsset
  test: SpriteAsset
  count: number = 0
  moveSpeed: number = 50

  constructor() {
    super()
    this.image = Gine.store.get('logo') as ImageAsset
    this.test = Gine.store.get('player') as SpriteAsset
  }

  tick(delta: number) {
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

    if (
      Gine.keyboard.allPressed()[KEYCODES.A] ||
      Gine.keyboard.allPressed()[KEYCODES.S] ||
      Gine.keyboard.allPressed()[KEYCODES.D] ||
      Gine.keyboard.allPressed()[KEYCODES.W]
    ) {
      if (Gine.keyboard.isPressed(KEYCODES.A)) {
        this.spriteX -= this.moveSpeed * delta
      }
      if (Gine.keyboard.isPressed(KEYCODES.D)) {
        this.spriteX += this.moveSpeed * delta
      }

      if (Gine.keyboard.isPressed(KEYCODES.W)) {
        this.spriteY -= this.moveSpeed * delta
      }

      if (Gine.keyboard.isPressed(KEYCODES.S)) {
        this.spriteY += this.moveSpeed * delta
      }
    }

    if (Gine.mouse.isMouseDown) {
      const pos = Gine.mouse.lastClick()
      this.spriteX = pos.x
      this.spriteY = pos.y
    }

    this.test.update()
  }

  frame() {
    Gine.handle.draw(Gine.store.get('logo'), this.x, this.y)
    Gine.handle.drawSprite(this.test, this.spriteX, this.spriteY)
    this.count++
  }
}
