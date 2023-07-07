import type { EffectConfig, Position } from '@/types';
import BaseEffect from './base';

type SkyStar = {
  x: number;
  y: number;
  o: number;
  x0: number;
  y0: number;
  o0: number;
};

export default class Sky extends BaseEffect {
  private r: number = 2; //星星半径
  private color: string; //星星颜色
  private num: number = 120;
  private stars: Array<SkyStar> = [];
  private w: number = 0;
  private h: number = 0;
  private lineColor: string;
  private lineWidth: number = 0.8;
  private lastPos: Position | null = null;
  private limitDistance: number = 0;
  private container: HTMLElement = document.body;

  constructor(options: EffectConfig, position: Position) {
    super(options, position);
    this.color = options.color || '#ffffff';
    this.lineColor = this.color;
    this.initContainer();
    this.initEvent();
    this.setStar();
  }

  private initContainer() {
    const { el } = this.options;
    if (typeof el === 'string') {
      this.container = document.querySelector(el) || this.container;
    }
  }

  private initEvent() {
    this.handleResize = this.handleResize.bind(this);
    window.addEventListener('resize', this.handleResize);
  }

  private handleResize() {
    if (
      this.w !== this.container.offsetWidth ||
      this.h !== this.container.offsetHeight
    ) {
      this.setStar();
    }
  }

  private setStar() {
    this.stars.length = 0;
    this.lastPos = null;
    this.w = this.container.offsetWidth;
    this.h = this.container.offsetHeight;
    this.limitDistance = (this.w + this.h) / 2 / 6;
    // 创建星空
    for (let i = 0; i < this.num; i++) {
      this.stars[i] = {
        x: Math.random() * this.w,
        y: Math.random() * this.h,
        o: 1,
        x0: Math.random() * 0.8 - 0.4,
        y0: Math.random() * 0.8 - 0.4,
        o0: (Math.random() - 0.5) / 60,
      };
    }
  }

  private drawStar(ctx: CanvasRenderingContext2D, star: SkyStar) {
    const { x, y, o } = star;
    const { color } = this;
    ctx.save();
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(x, y, this.r, 0, Math.PI * 2, true);
    const opacityStr = `00${Math.floor(o * 255).toString(16)}`.slice(-2);
    ctx.fillStyle = `${color}${opacityStr}`;
    ctx.fill();
    ctx.restore();
  }

  private link(ctx: CanvasRenderingContext2D) {
    if (!this.lastPos) return;
    const { num, stars, lineColor, lineWidth } = this;
    const { x: centerX, y: centerY } = this.lastPos;
    for (let i = 0; i < num; i++) {
      // 勾股定理算相邻距离
      var distance = Math.pow(
        Math.pow(centerX - stars[i].x, 2) + Math.pow(centerY - stars[i].y, 2),
        0.5
      );

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
   * 设置连线的计算点
   * @param pos
   */
  effect(pos: Position) {
    this.lastPos = pos;
  }

  /**
   * 绘制星空
   * @param {CanvasRenderingContext2D} ctx
   */
  render(ctx: CanvasRenderingContext2D): void {
    const { num, stars, w, h } = this;
    for (let i = 0; i < num; i++) {
      const star = stars[i];
      // 当星星到达屏幕边界时, 转换移动方向
      star.x0 = star.x < 0 || star.x > w ? -star.x0 : star.x0;
      star.y0 = star.y < 0 || star.y > h ? -star.y0 : star.y0;
      star.o0 = star.o <= 0 || star.o >= 1 ? -star.o0 : star.o0;
      // 使星星移动
      star.x += star.x0;
      star.y += star.y0;
      star.o += star.o0;
      star.o = star.o < 0 ? 0 : star.o > 1 ? 1 : star.o;
      this.drawStar(ctx, stars[i]);
    }
    this.link(ctx);
  }
}
