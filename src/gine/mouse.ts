import { fromEvent, merge, Observable } from 'rxjs'
import { EventTargetLike } from 'rxjs/internal/observable/fromEvent'
import { map, share, tap } from 'rxjs/operators'

import { Gine } from './core'

export interface IMousePosition {
    x: number
    y: number
    button: number
    type: 'mouseup' | 'mousedown'
    time?: number
}

export class Mouse {
    public readonly mouse$: Observable<IMousePosition>
    public isMouseDown: boolean = false
    private lastPosition: IMousePosition
    private lastClickPosition: IMousePosition

    constructor() {
        const mousedown = fromEvent<MouseEvent>(
            Gine.CONFIG.canvas as EventTargetLike<MouseEvent>,
            'mousedown'
        ).pipe(
            tap(ev => {
                this.lastClickPosition = this.getMousePosition(ev)
                this.isMouseDown = true
            })
        )

        const mouseup = fromEvent<MouseEvent>(
            Gine.CONFIG.canvas as EventTargetLike<MouseEvent>,
            'mouseup'
        ).pipe(
            tap(() => {
                this.isMouseDown = false
            })
        )
        const mousemove = fromEvent<MouseEvent>(
            Gine.CONFIG.canvas as EventTargetLike<MouseEvent>,
            'mousemove'
        )
        this.mouse$ = merge(mousedown, mouseup, mousemove).pipe(
            map((ev: MouseEvent) => {
                this.lastPosition = this.getMousePosition(ev)
                return this.lastPosition
            }),
            share()
        )
    }

    lastClick(): IMousePosition {
        return this.lastClickPosition
    }

    public getPosition(): IMousePosition {
        return this.lastPosition
    }

    public getMousePosition(ev: MouseEvent): IMousePosition {
        return {
            x: Math.round(ev.clientX / Gine.canvas.scale),
            y: Math.round(ev.clientY / Gine.canvas.scale),
            button: ev.button,
            type: ev.type,
        } as IMousePosition
    }
}
