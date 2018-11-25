import { ImageAsset, ImageOptions, SpriteOptions, SpriteAsset } from './image'

export class Store {
  private database: { [key: string]: any } = []

  constructor() {}

  public store(key: string, val: any): void {
    this.database[key] = val
  }

  public get(key: string): any | undefined {
    return this.database[key]
  }

  public image(key: string, src: string, options?: ImageOptions): void {
    const img = new ImageAsset(key, src, options)
    this.store(key, img)
  }

  public sprite(key: string, src: string, options?: SpriteOptions): void {
    const img = new SpriteAsset(key, src, options)
    this.store(key, img)
  }

  // This function does not work yet!
  public select(key: string, val: string): any[] {
    return this.database.filter((obj: any) => {
      return obj[key] === val
    })
  }
}
