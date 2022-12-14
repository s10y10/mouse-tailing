import type { ITail, Options, Position } from '../types';
export default abstract class BaseTail implements ITail {
    protected x: number;
    protected y: number;
    protected vx: number;
    protected vy: number;
    protected scale: number;
    protected opacity: number;
    protected angle: number;
    protected va: number;
    protected vo: number;
    protected options: Options;
    active: boolean;
    constructor(options: Options, position: Position);
    abstract render(ctx: CanvasRenderingContext2D): void;
}
