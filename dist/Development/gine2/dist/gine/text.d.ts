export declare class Text {
    readonly handle: CanvasRenderingContext2D;
    readonly text: string;
    readonly font: Font | undefined;
    constructor(handle: CanvasRenderingContext2D, text: string, font?: Font | undefined);
}
export declare class Font {
    readonly fontFamily: string | undefined;
    readonly fontSize: number | undefined;
    constructor(fontFamily?: string | undefined, fontSize?: number | undefined);
    toString(): string;
}
export declare const fontDefault: Font;
