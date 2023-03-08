import type { Options, Position } from '../types';
import BaseTail from './base';
export default class Sky extends BaseTail {
    private r;
    private color;
    private num;
    private stars;
    private w;
    private h;
    private lineColor;
    private lineWidth;
    private lastPos;
    private limitDistance;
    private container;
    constructor(options: Options, position: Position);
    private initContainer;
    private initEvent;
    private handleResize;
    private setStar;
    private drawStar;
    private link;
    /**
     * 设置连线的计算点
     * @param pos
     */
    setPos(pos: Position): void;
    /**
     * 绘制星空
     * @param {CanvasRenderingContext2D} ctx
     */
    render(ctx: CanvasRenderingContext2D): void;
}
