// Went for Asset, cause Image is reserved.
export type GineAsset = ImageAsset | SpriteAsset

export interface IGineAsset {
  type: string
  width: number
  height: number
  image: HTMLImageElement | null

  draw(): void
  update(): void
}
export class Asset implements IGineAsset {
  static ASSET = 'ASSET'
  static IMAGE = 'IMAGE'
  static SPRITE = 'SPRITE'

  public type: string = Asset.ASSET
  public width: number
  public height: number
  public image: HTMLImageElement
  public imageLoaded: boolean = false

  constructor(name: string, src: string) {
    this.image = new Image()
    this.image.src = src

    this.image.onload = () => {
      this.imageLoaded = true
      this.width = this.image.width
      this.height = this.image.height
    }
  }

  public draw() {}
  public update() {}
}

export class ImageAsset extends Asset {
  public type: string = Asset.IMAGE

  constructor(name: string, src: string, options?: ImageOptions) {
    super(name, src)
  }

  public draw() {}
  public update() {}
}

export class SpriteAsset extends Asset {
  public type: string = Asset.SPRITE

  public sizeX: number
  public sizeY: number
  public sourceX: number
  public sourceY: number
  public imagesPerRow: number
  public numberOfFrames: number = 1
  public readonly ticksPerFrame: number = 0
  public currentTick: number = 0
  public currentSpriteIndex: number = 0

  constructor(name: string, src: string, options?: SpriteOptions) {
    super(name, src)
    this.sizeX = options && options.widthPerImage ? options.widthPerImage : 0
    this.sizeY = options && options.heightPerImage ? options.heightPerImage : 0
    this.imagesPerRow =
      options && options.imagesPerRow ? options.imagesPerRow : 0
    this.numberOfFrames =
      options && options.numberOfFrames ? options.numberOfFrames : 1
    this.ticksPerFrame =
      options && options.ticksPerFrame ? options.ticksPerFrame : 1
    this.currentSpriteIndex =
      options && options.frameIndex ? options.frameIndex : 0
  }

  public draw() {
    const row = Math.floor(this.currentSpriteIndex / this.imagesPerRow)
    this.sourceX =
      (this.currentSpriteIndex - this.imagesPerRow * row) * this.sizeX
    this.sourceY =
      Math.floor(this.currentSpriteIndex / this.imagesPerRow) * this.sizeY
  }

  public calculatePerIndex(index: number) {
    if (index > this.numberOfFrames) {
      throw new Error(
        `Index ${index} is out of range of maximum frames (${
          this.numberOfFrames
        }) for sprite`
      )
    }
    const row = Math.floor(index / this.imagesPerRow)
    this.sourceX = (index - this.imagesPerRow * row) * this.sizeX
    this.sourceY = Math.floor(index / this.imagesPerRow) * this.sizeY
  }

  public update() {
    this.currentTick++
    if (this.currentTick > this.ticksPerFrame) {
      this.currentTick = 0
      this.currentSpriteIndex++
      if (this.currentSpriteIndex >= this.numberOfFrames) {
        this.currentSpriteIndex = 0
      }
    }
  }
}

export type GineImageOptions = ImageOptions | SpriteOptions

export class ImageOptions {
  constructor() {}
}

export class SpriteOptions extends ImageOptions {
  constructor(
    readonly widthPerImage: number,
    readonly heightPerImage: number,
    readonly imagesPerRow?: number,
    readonly numberOfFrames?: number,
    readonly ticksPerFrame?: number,
    readonly frameIndex?: number
  ) {
    super()
  }
}
