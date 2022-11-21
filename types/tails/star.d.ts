import type { ITail, Options, Position } from '../types';
export default class Star implements ITail {
    private x;
    private y;
    private vx;
    private vy;
    private r;
    private R;
    private color;
    private scale;
    private opacity;
    private angle;
    private va;
    private vo;
    private options;
    active: boolean;
    constructor(options: Options, position: Position);
    /**
     * 绘制星星
     * @param {CanvasRenderingContext2D} ctx
     */
    render(ctx: CanvasRenderingContext2D): void;
}
