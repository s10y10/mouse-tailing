import type { Position, TailConfig } from '@/types';
import BaseTail from './base';

export default class Icon extends BaseTail {
  constructor(options: TailConfig, position: Position) {
    super(options, position);
  }

  render(ctx: CanvasRenderingContext2D): void {
    const { scale, x, y, vx, vy, angle, va, vo, opacity } = this;
    const { resource } = this.options;
    ctx.save();
    ctx.translate(x, y);
    ctx.scale(scale, scale);
    ctx.rotate(angle);
    ctx.globalAlpha = opacity;
    ctx.drawImage(resource!, 0, 0);
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
