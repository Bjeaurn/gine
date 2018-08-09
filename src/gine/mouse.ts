import { Observable, fromEvent, merge } from 'rxjs';
import { map } from 'rxjs/operators';

export type MousePosition = {
  x: number;
  y: number;
  button: number;
  type: 'mouseup' | 'mousedown';
  time?: number;
};

export class Mouse {
  readonly mouse$: Observable<MousePosition>;
  private lastPosition: MousePosition;

  constructor(readonly canvas: HTMLCanvasElement) {
    const mousedown = fromEvent(this.canvas, 'mousedown');
    const mouseup = fromEvent(this.canvas, 'mouseup');
    const mousemove = fromEvent(this.canvas, 'mousemove');
    this.mouse$ = merge(mousedown, mouseup, mousemove).pipe(
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
