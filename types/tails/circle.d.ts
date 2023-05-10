import type { Options, Position } from '../types';
import BaseTail from './base';
export default class Bubble extends BaseTail {
    private r;
    private color;
    constructor(options: Options, position: Position);
    render(ctx: CanvasRenderingContext2D): void;
}
