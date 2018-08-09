import { Font } from "./text";
import { Handle } from "./handle";
import { Canvas } from "./canvas";
import { CONFIG, Config } from "./config";
import { map, share } from "rxjs/operators";
import { Observable, Subscription, interval, merge } from "rxjs";

export type TickTypes = "tick" | "frame" | "second";

export class Gine {
  static canvas: Canvas;
  static handle: Handle;
  public fps: number = 0;
  private frameCount: number = 0;
  private delta: number = 0;
  private tickrate: number = 0;
  private tickNr: number = 0;
  private then: number = performance.now();
  private second: number = performance.now();
  readonly fpsMs: number;
  readonly tickMs: number;

  readonly update$: Observable<TickTypes>;
  private updateSubscription: Subscription;
  readonly clock$: Observable<number>;

  constructor(readonly config: Config) {
    if (this.config.canvas === null) {
      throw new Error("No canvas given!");
    }
    Gine.canvas = new Canvas(this.config.canvas);
    Gine.handle = new Handle(Gine.canvas.canvasElm);
    this.fpsMs = 1000 / this.config.maxFps;
    this.tickMs = 1000 / this.config.tickRate;

    Gine.handle.setFont(new Font("Helvetica", 16));
    Gine.handle.setColor(0, 0, 0, 0.8);

    const ticks = interval(this.tickMs).pipe(map(() => "tick"));
    const frames = interval(this.fpsMs).pipe(map(() => "frame"));
    const seconds = interval(1000).pipe(map(() => "second"));

    this.update$ = merge<TickTypes>(ticks, frames, seconds).pipe(share());
  }

  start() {
    this.updateSubscription = this.update$.subscribe(t => this.fn(t));
  }

  stop() {
    this.updateSubscription.unsubscribe();
  }

  private fn(type: TickTypes): void {
    if (type === "frame") this.frame();
    if (type === "tick") this.tick();
    if (type === "second") {
      this.updateRateData();
    }
  }

  private updateRateData() {
    this.fps = this.frameCount;
    this.tickrate = this.tickNr;
    this.frameCount = 0;
    this.tickNr = 0;
  }

  frame(): void {
    Gine.handle.clear();
    Gine.handle.setColor(0, 0, 0);
    Gine.handle.handle.fillRect(1, 1, CONFIG.width - 2, CONFIG.height - 2);
    Gine.handle.setFont(new Font("Helvetica", 10));
    Gine.handle.setColor(0, 255, 0);
    Gine.handle.text("" + this.fps + "fps", 5, 16);
    Gine.handle.text("" + this.tickrate + " tickrate", 5, 40);
    this.frameCount++;
    window.requestAnimationFrame(() => {});
  }

  tick(): void {
    this.tickNr++;
    this.delta = (performance.now() - this.then) / 1000;
    this.then = performance.now();
  }
}
