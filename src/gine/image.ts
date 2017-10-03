export type GineImage = Image | Sprite

export class Image extends HTMLImageElement{
    type: string = 'Image'
}

export class Sprite implements ImageBitmap {
    type: string = 'Sprite'
    width: number
    height: number
    close: any
    // To be continued.
}