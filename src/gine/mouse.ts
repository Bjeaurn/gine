import { Observable, fromEvent, merge } from "../../node_modules/rxjs";
import { map } from "../../node_modules/rxjs/operators";

export type MousePosition = {
  x: number;
  y: number;
  button: number;
  type: "mouseup" | "mousedown";
  time?: number;
};

export class Mouse {
  readonly mouse$: Observable<MousePosition>;
  private lastPosition: MousePosition;

  constructor(readonly canvas: HTMLCanvasElement) {
    const mousedown = fromEvent(this.canvas, "mousedown");
    const mouseup = fromEvent(this.canvas, "mouseup");
    // mousemove ?
    this.mouse$ = merge(mousedown, mouseup).pipe(
      map((ev: MouseEvent) => {
        this.lastPosition = this.getMousePosition(ev);
        return this.lastPosition;
      })
    );
  }

  getPosition(): MousePosition {
    return this.lastPosition;
  }

  getMousePosition(ev: MouseEvent): MousePosition {
    return <MousePosition>{
      x: Math.round(ev.clientX),
      y: Math.round(ev.clientY),
      button: ev.button,
      type: ev.type
    };
  }
}
