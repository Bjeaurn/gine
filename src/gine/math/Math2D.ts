import { Gine, ImageAsset } from 'gine'

export class Math2D {
    static rotate(
        image: ImageAsset,
        x: number,
        y: number,
        degrees: number = 0
    ): void {
        const radians = (degrees * Math.PI) / 180
        Gine.handle.handle.save()
        Gine.handle.handle.translate(x, y)
        Gine.handle.handle.rotate(radians)
        Gine.handle.handle.drawImage(
            image.image,
            0 - image.width / 2,
            0 - image.height / 2
        )
        Gine.handle.handle.restore()
    }

    static degreesToRadians(degrees: number): number {
        return degrees * (Math.PI / 180)
    }

    static degreesToXY(degrees: number): { x: number; y: number } {
        const radians = this.degreesToRadians(degrees - 90)
        return {
            x: +Math.cos(radians).toFixed(3),
            y: +Math.sin(radians).toFixed(3),
        }
    }
}
