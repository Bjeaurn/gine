export class Config {
  usesTiles: boolean;
  tileSize: number;
  constructor(
    readonly width: number,
    readonly height: number,
    readonly canvas: HTMLCanvasElement | null,
    readonly tickRate: number = 105,
    readonly maxFps: number = 60,
    usesTiles: boolean = true,
    tileSize: number = 16
  ) {}
}

export const CONFIG: Config = {
  maxFps: 60,
  tickRate: 105,
  width: 800,
  height: 600,
  usesTiles: true,
  tileSize: 16,
  canvas: null
};
