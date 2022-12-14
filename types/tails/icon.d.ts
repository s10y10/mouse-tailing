import type { Options, Position } from '../types';
import BaseTail from './base';
export default class Icon extends BaseTail {
    constructor(options: Options, position: Position);
    render(ctx: CanvasRenderingContext2D): void;
}
