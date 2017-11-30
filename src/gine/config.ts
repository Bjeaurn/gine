export type Config = {
    maxFps: number
    tickRate: number
    width: number
    height: number
    usesTiles: boolean
    tileSize: number
    canvas: HTMLCanvasElement | null
}