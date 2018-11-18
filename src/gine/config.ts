export class Config {
  public usesTiles: boolean
  public tileSize: number
  public readonly viewport: IViewport
  constructor(
    readonly width: number,
    readonly height: number,
    readonly canvas: HTMLCanvasElement | null,
    readonly tickRate: number = 105,
    readonly maxFps: number = 60,
    usesTiles: boolean = true,
    tileSize: number = 16
  ) {
    const minTile = this.tileSize * 2
    this.viewport = {} as any
    this.viewport.minY = 0 - minTile
    this.viewport.minX = 0 - minTile
    this.viewport.maxX = this.width + minTile
    this.viewport.maxY = this.height + minTile
  }
}

export interface IViewport {
  minX: number
  minY: number
  maxX: number
  maxY: number
}

export const CONFIG = {
  maxFps: 60,
  tickRate: 105,
  width: 800,
  height: 600,
  usesTiles: true,
  tileSize: 16,
  canvas: null,
  viewport: {
    minY: -32,
    minX: -32,
    maxX: 632,
    maxY: 432
  }
}
