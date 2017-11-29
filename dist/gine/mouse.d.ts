import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/merge';
export declare type MousePosition = {
    x: number;
    y: number;
    button: number;
    type: 'mouseup' | 'mousedown';
    time?: number;
};
export declare class Mouse {
    readonly canvas: HTMLCanvasElement;
    readonly mouse$: Observable<MousePosition>;
    private lastPosition;
    constructor(canvas: HTMLCanvasElement);
    getPosition(): MousePosition;
    getMousePosition(ev: MouseEvent): MousePosition;
}
