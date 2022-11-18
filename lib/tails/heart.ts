import type { ITail, Options, Position } from '../types';

export default class Heart implements ITail {
  private x: number; //x轴坐标
  private y: number; //y轴坐标
  private vx: number; //x轴速度
  private vy: number; //y轴速度
  private r: number; //心的大小
  private vertices: Array<{ x: number; y: number }>; //心形的向量
  private color: string; //心的颜色
  private scale: number; //缩放大小
  private opacity: number; //透明度
  private angle: number; //角度
  private va: number; //角速度
  private vo: number; //透明度变化速度
  private options: Options; //参数
  private piece: number; //心形的分片
  public active: boolean; //是否被激活

  constructor(options: Options, position: Position) {
    this.options = options;
    this.x = position.x;
    this.y = position.y;
    this.r = 1;
    this.vx = Math.random() * 2 - 1;
    this.vy = Math.random() * 2 - 1;
    this.color = '#ff4022';
    this.scale = Math.random() * 0.5 + 0.5;
    this.opacity = 1;
    this.angle = Math.PI;
    this.va = Math.random() * 0.02 - 0.01;
    this.vo = this.options.duration! / 60 / 1000;
    this.vertices = [];
    this.piece = 20;
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
    this.active = true;
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
