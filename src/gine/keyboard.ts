import { Observable } from "rxjs/Observable"
import 'rxjs/add/operator/filter'

export type KeyEvent = {
    key: string
    type: 'keyup' | 'keydown'
}

export class Keyboard {

    readonly key$: Observable<KeyEvent>

    private pressed: boolean[] = []

    constructor(readonly canvas: HTMLCanvasElement) {
        // We seem to not be able to use the canvas to bind `keyup` and `keydown` directly.
        const keydown = Observable.fromEvent(document, 'keydown')
            .filter( (ev: KeyboardEvent) => { return !this.pressed[ev.keyCode] })
            .map( (ev: KeyboardEvent) => {
                this.pressed[ev.keyCode] = true
                return ev
            })

        const keyup = Observable.fromEvent(document, 'keyup')
            .map( (ev: KeyboardEvent) => {
                this.pressed[ev.keyCode] = false
                return ev
            })
        
        this.key$ = Observable.merge(keyup, keydown)
        .map( (ev: KeyboardEvent) => { 
            return <KeyEvent>{ key: ev.key, type: ev.type }
        })
    }
}