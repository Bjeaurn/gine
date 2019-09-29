import { ImageAsset, ImageOptions, SpriteAsset, SpriteOptions } from './image'

export class Store {
    private database: { [key: string]: any } = []

    constructor() {}

    public store(key: string, val: any): void {
        this.database[key] = val
    }

    public image(key: string, src: string, options?: ImageOptions): void {
        const img = new ImageAsset(key, src, options)
        this.store(key, img)
    }

    public sprite(key: string, src: string, options?: SpriteOptions): void {
        const img = new SpriteAsset(key, src, options)
        this.store(key, img)
    }

    public get<T = any>(key: string): T | undefined {
        return this.database[key]
    }

    public getImage(key: string): ImageAsset | undefined {
        return this.get<ImageAsset>(key)
    }

    public getSprite(key: string): SpriteAsset | undefined {
        return this.get<SpriteAsset>(key)
    }

    // This function does not work yet!
    public select(key: string, val: string): any[] {
        return this.database.filter((obj: any) => {
            return obj[key] === val
        })
    }
}
