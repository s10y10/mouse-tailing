import type { ITail, Options, Position } from '../types';

export default class Icon implements ITail {
  private x: number; //x轴坐标
  private y: number; //y轴坐标
  private vx: number; //x轴速度
  private vy: number; //y轴速度
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
    this.scale = Math.random() * 0.5 + 0.5;
    this.opacity = 1;
    this.angle = 0;
    this.va = Math.random() * 0.02 - 0.01;
    this.vo = this.options.duration! / 60 / 1000;
    this.active = true;
  }

  render(ctx: CanvasRenderingContext2D): void {
    const { scale, x, y, vx, vy, angle, va, vo } = this;
    const { resource } = this.options;
    ctx.save();
    ctx.translate(x, y);
    ctx.scale(scale, scale);
    ctx.rotate(angle);
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
