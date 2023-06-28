import type { Options, Position } from '../types';
import BaseTail from './base';
export default class Heart extends BaseTail {
    private img;
    private loaded;
    constructor(options: Options, position: Position);
    private initParams;
    render(ctx: CanvasRenderingContext2D): void;
}
