import { Observable, fromEvent, merge } from "rxjs";
import { map, filter } from "rxjs/operators";

export type KeyEvent = {
  key: string;
  type: "keyup" | "keydown";
};

export class Keyboard {
  readonly key$: Observable<KeyEvent>;

  private pressed: boolean[] = [];

  constructor(readonly canvas: HTMLCanvasElement) {
    // We seem to not be able to use the canvas to bind `keyup` and `keydown` directly.
    const keydown = fromEvent(document, "keydown").pipe(
      filter((ev: KeyboardEvent) => {
        return !this.pressed[ev.keyCode];
      }),
      map((ev: KeyboardEvent) => {
        this.pressed[ev.keyCode] = true;
        return ev;
      })
    );

    const keyup = fromEvent(document, "keyup").pipe(
      map((ev: KeyboardEvent) => {
        this.pressed[ev.keyCode] = false;
        return ev;
      })
    );

    this.key$ = merge(keyup, keydown).pipe(
      map((ev: KeyboardEvent) => {
        return <KeyEvent>{ key: ev.key, type: ev.type };
      })
    );
  }
}
