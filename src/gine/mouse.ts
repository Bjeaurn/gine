import { fromEvent, merge, Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { Gine } from './core'
import { EventTargetLike } from 'rxjs/internal/observable/fromEvent'

export interface IMousePosition {
  x: number
  y: number
  button: number
  type: 'mouseup' | 'mousedown'
  time?: number
}

export class Mouse {
  public readonly mouse$: Observable<IMousePosition>
  private lastPosition: IMousePosition

  constructor() {
    const mousedown = fromEvent<MouseEvent>(
      Gine.CONFIG.canvas as EventTargetLike<MouseEvent>,
      'mousedown'
    )
    const mouseup = fromEvent<MouseEvent>(
      Gine.CONFIG.canvas as EventTargetLike<MouseEvent>,
      'mouseup'
    )
    const mousemove = fromEvent<MouseEvent>(
      Gine.CONFIG.canvas as EventTargetLike<MouseEvent>,
      'mousemove'
    )
    this.mouse$ = merge(mousedown, mouseup, mousemove).pipe(
      map((ev: MouseEvent) => {
        this.lastPosition = this.getMousePosition(ev)
        return this.lastPosition
      })
    )
  }

  public getPosition(): IMousePosition {
    return this.lastPosition
  }

  public getMousePosition(ev: MouseEvent): IMousePosition {
    return {
      x: Math.round(ev.clientX),
      y: Math.round(ev.clientY),
      button: ev.button,
      type: ev.type
    } as IMousePosition
  }
}
