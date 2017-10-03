export type Config = {
    MAXFPS: number
    tickRate: number
    width: number
    height: number
    canvasId: string
}

export const CONFIG: Config = {
    MAXFPS: 60,
    tickRate: 100,
    width: 600,
    height: 400,
    canvasId: 'game'
}