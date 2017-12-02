export declare type GineAsset = ImageAsset | SpriteAsset;
export interface IGineAsset {
    type: string;
    width: number;
    height: number;
    image: HTMLImageElement | null;
    draw(): void;
    update(): void;
}
export declare class Asset implements IGineAsset {
    type: string;
    width: number;
    height: number;
    image: HTMLImageElement;
    imageLoaded: boolean;
    constructor(name: string, src: string);
    draw(): void;
    update(): void;
}
export declare class ImageAsset extends Asset {
    type: string;
    constructor(name: string, src: string, options: ImageOptions);
    draw(): void;
    update(): void;
}
export declare class SpriteAsset extends Asset {
    type: string;
    sizeX: number;
    sizeY: number;
    numberOfFrames: number;
    ticksPerFrame: number;
    frameIndex: number;
    constructor(name: string, src: string, options: SpriteOptions);
    draw(): void;
    update(): void;
}
export declare type GineImageOptions = ImageOptions | SpriteOptions;
export declare class ImageOptions {
    constructor();
}
export declare class SpriteOptions extends ImageOptions {
    readonly widthPerImage: number;
    readonly heightPerImage: number;
    readonly numberOfFrames: number | undefined;
    readonly ticksPerFrame: number | undefined;
    readonly frameIndex: number | undefined;
    constructor(widthPerImage: number, heightPerImage: number, numberOfFrames?: number | undefined, ticksPerFrame?: number | undefined, frameIndex?: number | undefined);
}
