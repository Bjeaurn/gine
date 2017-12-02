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
const assetFolder = 'assets'

export class Asset implements IGineAsset {
    type: string = 'Asset'
    width: number
    height: number
    image: HTMLImageElement
    imageLoaded: boolean = false
    
    constructor(name: string, src: string) {
        this.image = new Image()
        this.image.src = assetFolder+'/'+src

        this.image.onload = () => {
            this.imageLoaded = true
            this.width = this.image.width
            this.height = this.image.height
        }
    }

    draw() {}
    update() {}
}

export class ImageAsset extends Asset {
    type: string = 'Image'

    constructor(name: string, src: string, options: ImageOptions) {
        super(name, src)
    }

    draw() {}
    update() {}
}

export class SpriteAsset extends Asset {
    type: string = 'Sprite'

    sizeX: number
    sizeY: number
    numberOfFrames: number = 1    
    ticksPerFrame: number = 0
    frameIndex: number = 0

    constructor(name: string, src: string, options: SpriteOptions) {
        super(name, src)
        this.numberOfFrames = options.numberOfFrames || 1
        this.ticksPerFrame = options.ticksPerFrame || 0
        this.frameIndex = options.frameIndex || 0
    }

    draw() {
    }
    update() {}
}

export type GineImageOptions = ImageOptions | SpriteOptions

export class ImageOptions {
    constructor() {}
}

export class SpriteOptions extends ImageOptions {
    constructor(
        readonly widthPerImage: number,
        readonly heightPerImage: number,
        readonly numberOfFrames?: number,
        readonly ticksPerFrame?: number,
        readonly frameIndex?: number
    ) { super() }
}