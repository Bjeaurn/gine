export class Keyboard {
    constructor(readonly canvas: HTMLCanvasElement) {
        this.canvas.addEventListener('keydown', () => {}, false)
        this.canvas.addEventListener('keyup', () => {}, false)
    }
}