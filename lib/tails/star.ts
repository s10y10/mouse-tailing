import type { TailConfig, Position } from '../types';
import { getRandomColor } from '../tools';
import BaseTail from './base';

interface Track {
  p1: Position;
  p2: Position;
}

export default class Star extends BaseTail {
  private r: number = 6; //星星内径
  private R: number = 12; //星星外径
  private color: string = ''; //星星颜色
  private starTrackMap: Map<number, Track> = new Map();

  constructor(options: TailConfig, position: Position) {
    super(options, position);
    this.initParams();
  }

  // 初始化参数
  private initParams() {
    const { r, R, options } = this;
    this.color = options.color || getRandomColor();
    for (let i = 0; i < 5; i++) {
      const p1 = {
        x: Math.cos(((18 + i * 72) / 180) * Math.PI) * R + R,
        y: -Math.sin(((18 + i * 72) / 180) * Math.PI) * R + R,
      };
      const p2 = {
        x: Math.cos(((54 + i * 72) / 180) * Math.PI) * r + R,
        y: -Math.sin(((54 + i * 72) / 180) * Math.PI) * r + R,
      };
      this.starTrackMap.set(i, { p1, p2 });
    }
  }

  /**
   * 绘制星星
   * @param {CanvasRenderingContext2D} ctx
   */
  render(ctx: CanvasRenderingContext2D): void {
    const { color, scale, x, y, vx, vy, angle, va, vo, opacity, starTrackMap } =
      this;
    ctx.save();
    ctx.translate(x, y);
    ctx.scale(scale, scale);
    ctx.rotate(angle);
    ctx.beginPath();
    for (let i = 0; i < 5; i++) {
      const { p1, p2 } = starTrackMap.get(i)!;
      ctx.lineTo(p1.x, p1.y);
      ctx.lineTo(p2.x, p2.y);
    }
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
