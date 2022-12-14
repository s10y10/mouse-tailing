import type { Options, Position } from '../types';
import { getRandomColor } from '../tools';
import BaseTail from './base';

export default class Star extends BaseTail {
  private r: number; //星星内径
  private R: number; //星星外径
  private color: string; //星星颜色

  constructor(options: Options, position: Position) {
    super(options, position);
    this.r = 6;
    this.R = 12;
    this.color = getRandomColor();
  }

  /**
   * 绘制星星
   * @param {CanvasRenderingContext2D} ctx
   */
  render(ctx: CanvasRenderingContext2D): void {
    const { color, scale, x, y, vx, vy, R, r, angle, va, vo } = this;
    ctx.save();
    ctx.translate(x, y);
    ctx.scale(scale, scale);
    ctx.rotate(angle);
    ctx.beginPath();
    for (let i = 0; i < 5; i++) {
      ctx.lineTo(
        Math.cos(((18 + i * 72) / 180) * Math.PI) * R + R,
        -Math.sin(((18 + i * 72) / 180) * Math.PI) * R + R
      );
      ctx.lineTo(
        Math.cos(((54 + i * 72) / 180) * Math.PI) * r + R,
        -Math.sin(((54 + i * 72) / 180) * Math.PI) * r + R
      );
    }
    ctx.closePath();
    const opacityStr = `00${Math.floor(this.opacity * 255).toString(16)}`.slice(
      -2
    );
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
