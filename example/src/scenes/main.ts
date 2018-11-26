import { Scene, ImageAsset, Gine } from 'gine'

export class MainScene extends Scene {
  readonly image: ImageAsset
  constructor() {
    super()
    console.log('constructing instance of MainScene')
    this.image = Gine.store.get('logo') as ImageAsset
  }

  init() {}

  frame() {
    Gine.handle.draw(
      this.image,
      Gine.canvas.width / 2 - this.image.width / 2,
      Gine.canvas.height / 2 - this.image.height / 2
    )
  }
}
