import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/filter';
export declare type KeyEvent = {
    key: string;
    type: 'keyup' | 'keydown';
};
export declare class Keyboard {
    readonly canvas: HTMLCanvasElement;
    readonly key$: Observable<KeyEvent>;
    private pressed;
    constructor(canvas: HTMLCanvasElement);
}
