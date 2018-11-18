import { fromEvent, merge, Observable } from 'rxjs'
import { filter, map } from 'rxjs/operators'

export interface IKeyEvent {
  key: string
  type: 'keyup' | 'keydown'
}

export class Keyboard {
  public readonly key$: Observable<IKeyEvent>

  private pressed: boolean[] = []

  constructor(readonly canvas: HTMLCanvasElement) {
    // We seem to not be able to use the canvas to bind `keyup` and `keydown` directly.
    const keydown = fromEvent(document, 'keydown').pipe(
      filter((ev: KeyboardEvent) => {
        return !this.pressed[ev.keyCode]
      }),
      map((ev: KeyboardEvent) => {
        this.pressed[ev.keyCode] = true
        return ev
      }),
    )

    const keyup = fromEvent(document, 'keyup').pipe(
      map((ev: KeyboardEvent) => {
        this.pressed[ev.keyCode] = false
        return ev
      }),
    )

    this.key$ = merge(keyup, keydown).pipe(
      map((ev: KeyboardEvent) => {
        return { key: ev.key, type: ev.type } as IKeyEvent
      }),
    )
  }
}
