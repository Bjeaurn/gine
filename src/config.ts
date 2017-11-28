export type Config = {
    maxFps: number
    tickRate: number
    width: number
    height: number
    usesTiles: boolean
    tileSize: number
    canvasId: string
}

export const CONFIG: Config = {
    maxFps: 60,
    tickRate: 105,
    width: 800,
    height: 600,
    usesTiles: true,
    tileSize: 16,
    canvasId: 'game'
}