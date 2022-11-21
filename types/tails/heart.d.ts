import type { ITail, Options, Position } from '../types';
export default class Heart implements ITail {
    private x;
    private y;
    private vx;
    private vy;
    private r;
    private vertices;
    private color;
    private scale;
    private opacity;
    private angle;
    private va;
    private vo;
    private options;
    private piece;
    active: boolean;
    constructor(options: Options, position: Position);
    render(ctx: CanvasRenderingContext2D): void;
}
