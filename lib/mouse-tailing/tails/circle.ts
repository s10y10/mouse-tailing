import { getRandomColor } from '@/tools';
import type { Position, TailConfig } from '@/types';
import BaseTail from './base';

export default class Bubble extends BaseTail {
  private r: number = 7; //圆圈半径
  private color: string; //圆圈颜色

  constructor(options: TailConfig, position: Position) {
    super(options, position);
    this.color = options.color || getRandomColor();
  }

  render(ctx: CanvasRenderingContext2D): void {
    const { color, scale, x, y, vx, vy, r, angle, va, vo, opacity } = this;
    ctx.save();
    ctx.translate(x, y);
    ctx.scale(scale, scale);
    ctx.rotate(angle);
    ctx.beginPath();
    ctx.arc(0, 0, r, 0, 2 * Math.PI);
    ctx.closePath();
    const opacityStr = `00${Math.floor(opacity * 255).toString(16)}`.slice(-2);
    ctx.fillStyle = `${color}${opacityStr}`;
    ctx.fill();
    ctx.restore();
    this.x += vx;
    this.y += vy;
    this.opacity -= vo;
    this.angle += va;
    if (this.opacity < 0) {
      this.active = false;
    }
  }
}
