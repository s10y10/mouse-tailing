import type { Options, Position } from '../types';
import BaseTail from './base';

export default class Heart extends BaseTail {
  private r: number = 1; //心的大小
  private vertices: Array<{ x: number; y: number }>; //心形的向量
  private color: string = '#ff4022'; //心的颜色
  private piece: number = 20; //心形的分片

  constructor(options: Options, position: Position) {
    super(options, position);
    this.angle = Math.PI;
    this.vertices = [];
    for (let i = 0; i < this.piece; i++) {
      var step = (i / this.piece) * (Math.PI * 2);
      var vector = {
        x: this.r * (16 * Math.pow(Math.sin(step), 3)),
        y:
          this.r *
          (13 * Math.cos(step) -
            5 * Math.cos(2 * step) -
            2 * Math.cos(3 * step) -
            Math.cos(4 * step)),
      };
      this.vertices.push(vector);
    }
  }

  render(ctx: CanvasRenderingContext2D): void {
    const { color, scale, x, y, vx, vy, vertices, angle, va, vo } = this;
    ctx.save();
    ctx.translate(x, y);
    ctx.scale(scale, scale);
    ctx.rotate(angle);
    ctx.beginPath();
    for (let i = 0; i < this.piece; i++) {
      const vector = vertices[i];
      ctx.lineTo(vector.x, vector.y);
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
