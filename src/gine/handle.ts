import { Canvas } from "./canvas";
import { Asset, ImageAsset, SpriteAsset } from "./image";
import { Font } from "./text";
import { CONFIG } from "./config";

export class Handle {
  readonly handle: CanvasRenderingContext2D;
  constructor(private canvas: HTMLCanvasElement) {
    this.handle = <CanvasRenderingContext2D>this.canvas.getContext("2d");
  }

  clear() {
    this.handle.clearRect(0, 0, CONFIG.width, CONFIG.height);
  }

  text(value: string | number, x: number, y: number) {
    this.handle.fillText(<string>value, x, y);
  }

  setFont(font: Font) {
    this.handle.font = font.toString();
  }

  setColor(red: number, green: number, blue: number, alpha?: number) {
    if (!alpha) alpha = 1.0;
    this.handle.fillStyle =
      "rgba(" + red + "," + green + "," + blue + "," + alpha + ")";
  }

  draw(image: Asset, x: number, y: number) {
    this.handle.drawImage(image.image, x, y);
  }

  rotateImage(image: Asset, degrees?: number) {
    if (!degrees) degrees = 0;
    const radians = (degrees * Math.PI) / 180;
    // COME BACK TO THIS LATER, FIGURE OUT THE `BUFFERHANDLE`
  }

  resetColor() {
    this.setColor(0, 0, 0);
  }

  scale(scale: number) {
    this.handle.scale(scale, scale);
  }
}
