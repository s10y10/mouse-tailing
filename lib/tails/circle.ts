import type { ITail, Options, Position } from '../types';
import { getRandomColor } from '../tools';

export default class Bubble implements ITail {
  private x: number; //x轴坐标
  private y: number; //y轴坐标
  private vx: number; //x轴速度
  private vy: number; //y轴速度
  private r: number; //圆圈半径
  private color: string; //星星颜色
  private scale: number; //缩放大小
  private opacity: number; //透明度
  private angle: number; //角度
  private va: number; //角速度
  private vo: number; //透明度变化速度
  private options: Options; //参数
  public active: boolean; //是否被激活

  constructor(options: Options, position: Position) {
    this.options = options;
    this.x = position.x;
    this.y = position.y;
    this.vx = Math.random() * 2 - 1;
    this.vy = Math.random() * 2 - 1;
    this.r = 7;
    this.color = getRandomColor();
    this.scale = Math.random() * 0.5 + 0.5;
    this.opacity = 1;
    this.angle = 0;
    this.va = Math.random() * 0.02 - 0.01;
    this.vo = this.options.duration! / 60 / 1000;
    this.active = true;
  }

  render(ctx: CanvasRenderingContext2D): void {
    const { color, scale, x, y, vx, vy, r, angle, va, vo } = this;
    ctx.save();
    ctx.translate(x, y);
    ctx.scale(scale, scale);
    ctx.rotate(angle);
    ctx.beginPath();
    ctx.arc(0, 0, r, 0, 2 * Math.PI);
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
