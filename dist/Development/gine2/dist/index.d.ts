import { Handle } from './gine/handle';
import { Config } from './config';
import { Observable } from 'rxjs';
import { Canvas } from "./gine/canvas";
export declare class Main {
    readonly config: Config;
    readonly canvas: Canvas;
    readonly handle: Handle;
    fps: number;
    private frameCount;
    private delta;
    private tickrate;
    private tickNr;
    private then;
    private second;
    readonly fpsMs: number;
    readonly tickMs: number;
    readonly update$: Observable<string>;
    private updateSubscription;
    readonly clock$: Observable<number>;
    constructor(config: Config);
    start(): void;
    stop(): void;
    fn(type: string): void;
    frame(): void;
    tick(): void;
}
