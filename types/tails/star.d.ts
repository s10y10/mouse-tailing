import type { ITail, TailOptions } from '../types';
export default class Star implements ITail {
    private type;
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
    active: boolean;
    constructor(options: TailOptions);
    getRandomColor(): string;
    render(ctx: CanvasRenderingContext2D): void;
}
