import { fromEvent, merge, Observable } from 'rxjs'
import { EventTargetLike } from 'rxjs/internal/observable/fromEvent'
import { filter, map } from 'rxjs/operators'

import { KEYCODES } from './keyboard.keycodes'

export interface IKeyEvent {
    key: string
    type: 'keyup' | 'keydown'
}

export class Keyboard {
    static readonly KEYCODES = KEYCODES
    public readonly key$: Observable<IKeyEvent>

    private pressed: boolean[] = []

    constructor() {
        const keydown = fromEvent<KeyboardEvent>(
            document as EventTargetLike<KeyboardEvent>,
            'keydown'
        ).pipe(
            filter((ev: KeyboardEvent) => {
                return !this.pressed[ev.keyCode]
            }),
            map((ev: KeyboardEvent) => {
                this.pressed[ev.keyCode] = true
                return ev
            })
        )

        const keyup = fromEvent<KeyboardEvent>(
            document as EventTargetLike<KeyboardEvent>,
            'keyup'
        ).pipe(
            map((ev: KeyboardEvent) => {
                this.pressed[ev.keyCode] = false
                return ev
            })
        )

        this.key$ = merge(keyup, keydown).pipe(
            map((ev: KeyboardEvent) => {
                return { key: ev.key, type: ev.type } as IKeyEvent
            })
        )
    }

    allPressed(): boolean[] {
        return this.pressed
    }

    isPressed(keycode: number): boolean {
        return this.pressed[keycode]
    }
}
