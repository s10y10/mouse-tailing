import type { Options, Position } from '../types';
import BaseTail from './base';
export default class Heart extends BaseTail {
    private r;
    private vertices;
    private color;
    private piece;
    constructor(options: Options, position: Position);
    render(ctx: CanvasRenderingContext2D): void;
}
