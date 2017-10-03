export class Text {
    constructor(readonly handle: CanvasRenderingContext2D, readonly text: string, readonly font?: Font) {
    }
}

export class Font {
    constructor(readonly fontFamily?: string, readonly fontSize?: number) {
        if(!this.fontFamily) this.fontFamily = 'Helvetica'
        if(!this.fontSize) this.fontSize = 12
    }

    toString(): string {
        return this.fontSize+'px '+this.fontFamily
    }
}

export const fontDefault = new Font()