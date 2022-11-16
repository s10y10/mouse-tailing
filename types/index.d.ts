import { Options } from './types';
declare class MouseTailing {
    private canvas;
    private ctx;
    private w;
    private h;
    private tailList;
    private options;
    constructor(options: Options);
    private init;
    private render;
    private drawTail;
    private handleResize;
    private handleMove;
    private createCanvas;
    private appendToBody;
}
export declare const createMouseTailing: (options?: Options) => MouseTailing;
export {};
