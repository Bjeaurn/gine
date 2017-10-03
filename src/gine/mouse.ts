export type MousePosition = {
    x: number
    y: number
    time?: number
}

export class Mouse {

    private lastPosition: MousePosition

    constructor(readonly canvas: HTMLCanvasElement) {
        this.canvas.addEventListener('mousedown', ev => 
            this.lastPosition = this.getMousePosition(ev), false)

        this.canvas.addEventListener('mousemove', ev => {}, false)
        
        this.canvas.addEventListener('mouseup', ev => {}, false)
    }

    getPosition(): MousePosition {
        return this.lastPosition
    }

    getMousePosition(ev: MouseEvent): MousePosition {
        return <MousePosition>{
            x: Math.round((ev.clientX)),
            y: Math.round((ev.clientY))
        }
    }
}