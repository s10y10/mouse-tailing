import type { Options, Position } from '../types';
import BaseTail from './base';

type SkyStar = {
  x: number;
  y: number;
  x0: number;
  y0: number;
};

export default class Sky extends BaseTail {
  private r: number; //星星半径
  private color: string; //星星颜色
  private num: number = 100;
  private stars: Array<SkyStar> = [];
  private w: number;
  private h: number;
  private lineColor: string = '#ffffff';
  private lineWidth: number = 0.8;
  private lastPos: Position = { x: -1, y: -1 };
  private limitDistance: number = 100;

  constructor(
    ctx: CanvasRenderingContext2D,
    options: Options,
    position: Position
  ) {
    super(options, position);
    this.r = 2;
    this.color = '#ffffff';

    this.w = window.innerWidth;
    this.h = window.innerHeight;

    // 创建星空
    for (let i = 0; i < this.num; i++) {
      this.stars[i] = {
        x: Math.random() * this.w,
        y: Math.random() * this.h,
        x0: Math.random() * 0.5 - 0.25,
        y0: Math.random() * 0.5 - 0.25,
      };
      this.drawStar(ctx, this.stars[i]);
    }
  }

  private drawStar(ctx: CanvasRenderingContext2D, star: SkyStar) {
    const { x, y } = star;
    ctx.save();
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(x, y, this.r, 0, Math.PI * 2, true);
    ctx.fill();
    ctx.restore();
  }

  private link(ctx: CanvasRenderingContext2D, pos: Position) {
    const { num, stars, lineColor, lineWidth } = this;
    const { x: centerX, y: centerY } = pos || this.lastPos;
    for (let i = 0; i < num; i++) {
      // 勾股定理算相邻距离
      var distance = Math.pow(
        Math.pow(centerX - stars[i].x, 2) + Math.pow(centerY - stars[i].y, 2),
        0.5
      );
      console.log(centerX, centerY, distance);
      if (distance < this.limitDistance) {
        ctx.save();
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.lineTo(stars[i].x, stars[i].y);
        ctx.strokeStyle = lineColor;
        ctx.lineWidth = lineWidth;
        ctx.stroke();
        ctx.restore();
      }
    }
  }

  /**
   * 绘制星空
   * @param {CanvasRenderingContext2D} ctx
   */
  render(ctx: CanvasRenderingContext2D, pos: Position): void {
    if (pos) {
      this.lastPos = pos;
      return;
    }
    const { num, stars, w, h } = this;
    for (let i = 0; i < num; i++) {
      const star = stars[i];
      // 当星星到达屏幕边界时, 转换移动方向
      star.x0 = star.x < 0 || star.x > w ? -star.x0 : star.x0;
      star.y0 = star.y < 0 || star.y > h ? -star.y0 : star.y0;
      // 使星星移动
      star.x += star.x0;
      star.y += star.y0;
      this.drawStar(ctx, stars[i]);
    }
    this.link(ctx, this.lastPos);
  }
}
