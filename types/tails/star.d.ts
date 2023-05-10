import type { Options, Position } from '../types';
import BaseTail from './base';
export default class Star extends BaseTail {
    private r;
    private R;
    private color;
    private starTrackMap;
    constructor(options: Options, position: Position);
    private initParams;
    /**
     * 绘制星星
     * @param {CanvasRenderingContext2D} ctx
     */
    render(ctx: CanvasRenderingContext2D): void;
}
