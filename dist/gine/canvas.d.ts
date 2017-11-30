export declare class Canvas {
    readonly canvasElm: HTMLCanvasElement;
    readonly width: number;
    readonly height: number;
    readonly tilesX: number | undefined;
    readonly tilesY: number | undefined;
    private scale;
    constructor(canvas: HTMLCanvasElement);
    resize(): void;
}
