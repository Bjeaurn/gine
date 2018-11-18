import { fromEvent, merge, Observable } from 'rxjs'
import { map } from 'rxjs/operators'

export interface MousePosition {
  x: number
  y: number
  button: number
  type: 'mouseup' | 'mousedown'
  time?: number
}

export class Mouse {
  public readonly mouse$: Observable<MousePosition>
  private lastPosition: MousePosition

  constructor(readonly canvas: HTMLCanvasElement) {
    const mousedown = fromEvent(this.canvas, 'mousedown')
    const mouseup = fromEvent(this.canvas, 'mouseup')
    const mousemove = fromEvent(this.canvas, 'mousemove')
    this.mouse$ = merge(mousedown, mouseup, mousemove).pipe(
      map((ev: MouseEvent) => {
        this.lastPosition = this.getMousePosition(ev)
        return this.lastPosition
      }),
    )
  }

  public getPosition(): MousePosition {
    return this.lastPosition
  }

  public getMousePosition(ev: MouseEvent): MousePosition {
    return {
      x: Math.round(ev.clientX),
      y: Math.round(ev.clientY),
      button: ev.button,
      type: ev.type,
    } as MousePosition
  }
}
