import type { Options, Position } from '../types';
import BaseTail from './base';
export default class Star extends BaseTail {
    private r;
    private R;
    private color;
    constructor(options: Options, position: Position);
    /**
     * η»εΆζζ
     * @param {CanvasRenderingContext2D} ctx
     */
    render(ctx: CanvasRenderingContext2D): void;
}
