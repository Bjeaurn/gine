export class Config {
  readonly width: number
  readonly height: number
  readonly maxFps: number
  readonly tickRate: number
  readonly tileSize: number
  readonly usesTiles: boolean
  public readonly viewport: IViewport
  constructor(
    readonly canvas: HTMLCanvasElement | null,
    readonly args: IConfigArguments
  ) {
    this.width = this.args.width || 600
    this.height = this.args.height || 400
    this.tickRate = this.args.tickRate || 120
    this.maxFps = this.args.maxFps || 60
    this.tileSize = this.args.tileSize || 16
    this.usesTiles = this.args.usesTiles || true
    const minTile = this.tileSize * 2
    this.viewport = {} as any
    this.viewport.minY = 0 - minTile
    this.viewport.minX = 0 - minTile
    this.viewport.maxX = this.width + minTile
    this.viewport.maxY = this.height + minTile
  }
}

export interface IConfigArguments {
  readonly width?: number
  readonly height?: number
  readonly tickRate?: number
  readonly maxFps?: number
  usesTiles?: boolean
  tileSize?: number
}

export interface IViewport {
  minX: number
  minY: number
  maxX: number
  maxY: number
}

export const DEFAULT_CONFIG: IConfigArguments = {
  maxFps: 60,
  tickRate: 105,
  width: 800,
  height: 600,
  usesTiles: true,
  tileSize: 16
}
