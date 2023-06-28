import type { Options, Position } from '../types';
import BaseTail from './base';

export default class Heart extends BaseTail {
  private img!: HTMLImageElement;
  private loaded: boolean = true;

  constructor(options: Options, position: Position) {
    super(options, position);
    this.initParams();
  }

  private initParams() {
    this.angle = 0;
    const color = this.options.color || '#ff4022';
    const svgString = `<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 30 30" fill="${color}">
    <path d="M12 21.35l-.65-.59C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.93 0 3.68.93 4.5 2.36C13.82 3.93 15.57 3 17.5 3c3.08 0 5.5 2.42 5.5 5.5 0 3.78-3.4 6.86-9.35 12.26L12 21.35z"/>
    </svg>`;
    this.img = new Image();
    this.img.onload = () => {
      this.loaded = true;
    };
    this.img.src = `data:image/svg+xml;base64,${window.btoa(svgString)}`;
  }

  render(ctx: CanvasRenderingContext2D): void {
    if (!this.loaded) {
      return;
    }
    const { scale, x, y, vx, vy, angle, va, vo, opacity } = this;
    ctx.save();
    ctx.translate(x, y);
    ctx.scale(scale, scale);
    ctx.rotate(angle);
    ctx.globalAlpha = opacity;
    ctx.drawImage(this.img, 0, 0);
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
