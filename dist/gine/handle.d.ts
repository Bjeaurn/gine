import { Asset } from './image';
import { Font } from './text';
export declare class Handle {
    private canvas;
    readonly handle: CanvasRenderingContext2D;
    constructor(canvas: HTMLCanvasElement);
    clear(): void;
    text(value: string | number, x: number, y: number): void;
    setFont(font: Font): void;
    setColor(red: number, green: number, blue: number, alpha?: number): void;
    draw(image: Asset, x: number, y: number): void;
    rotateImage(image: Asset, degrees?: number): void;
    resetColor(): void;
    scale(scale: number): void;
}
