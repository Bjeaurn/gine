import { GineImage, Image, Sprite } from './image'
import {Font} from './text';
import { CONFIG } from '../config'

export class Handle { 
    constructor(readonly handle: CanvasRenderingContext2D) {
        if(this.handle === null) throw "No 2D Context on Canvas."        
    }

    clear() {
        this.handle.clearRect(0, 0, CONFIG.width, CONFIG.height)
    }

    text(value: string | number, x: number, y: number) {
        this.handle.fillText(<string>value, x, y)
    }

    setFont(font: Font) {
        this.handle.font = font.toString()
    }

    setColor(red: number, green: number, blue: number, alpha?: number) {
        if(!alpha) alpha = 1.0
        this.handle.fillStyle = 'rgba('+red+','+green+','+blue+','+alpha+')'
    }

    draw(image: GineImage, x: number, y: number) {
        // Needs a sprite implementation!
        this.handle.drawImage(image, x, y)
    }

    rotate(image: GineImage, degrees?: number) {
        if(!degrees) degrees = 0
        const radians = degrees * Math.PI / 180
        // COME BACK TO THIS LATER, FIGURE OUT THE `BUFFERHANDLE`
    }

    resetColor() {
        this.setColor(0, 0, 0)
    }
}