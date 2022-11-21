import type { ITail, Options, Position } from '../types';
export default class Bubble implements ITail {
    private x;
    private y;
    private vx;
    private vy;
    private r;
    private color;
    private scale;
    private opacity;
    private angle;
    private va;
    private vo;
    private options;
    active: boolean;
    constructor(options: Options, position: Position);
    render(ctx: CanvasRenderingContext2D): void;
}
