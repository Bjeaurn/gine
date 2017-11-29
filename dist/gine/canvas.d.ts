import { Handle } from './handle';
export declare class Canvas {
    readonly canvas: HTMLCanvasElement;
    readonly _handle: Handle;
    readonly width: number;
    readonly height: number;
    readonly tilesX: number | undefined;
    readonly tilesY: number | undefined;
    private scale;
    constructor(canvas: HTMLCanvasElement);
    readonly handle: Handle;
    clear(): void;
    resize(): void;
}
