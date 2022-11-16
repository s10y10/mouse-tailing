import type { ITail, TailOptions } from '../types';
import { TAIL_TYPE } from '../consts';

export default class Star implements ITail {
  private type: number; //尾巴类型
  private x: number; //x轴坐标
  private y: number; //y轴坐标
  private vx: number; //x轴速度
  private vy: number; //y轴速度
  private r: number; //星星内径
  private R: number; //星星内径
  private color: string; //星星颜色
  private scale: number; //缩放大小
  private opacity: number; //透明度
  private angle: number; //角度
  private va: number; //角速度
  public active: boolean; //是否被激活

  constructor(options: TailOptions) {
    this.type = TAIL_TYPE.STAR;
    this.x = options.x;
    this.y = options.y;
    this.vx = Math.random() * 2 - 1;
    this.vy = Math.random() * 2 - 1;
    this.r = 6;
    this.R = 12;
    this.color = this.getRandomColor();
    this.scale = Math.random() * 0.5 + 0.5;
    this.opacity = 1;
    this.angle = 0;
    this.va = Math.random() * 0.01 - 0.02;
    this.active = true;
  }

  getRandomColor(): string {
    return `#${Math.round(Math.random() * 0xffffff).toString(16)}`;
  }

  render(ctx: CanvasRenderingContext2D): void {
    const { color, scale, x, y, vx, vy, R, r, angle, va } = this;
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
    ctx.fillStyle = color;
    ctx.fill();
    ctx.restore();
    this.x += vx;
    this.y += vy;
    this.opacity -= 0.02;
    this.angle += va;
    if (this.opacity < 0) {
      this.active = false;
    }
  }
}
