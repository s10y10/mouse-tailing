import { ITail, Options } from './types';
import { createTail } from './tails';

class MouseTailing {
  private canvas: HTMLCanvasElement | null;
  private ctx: CanvasRenderingContext2D | null;
  private w: number;
  private h: number;
  private tailList: Array<ITail>;
  private options: Options;
  constructor(options: Options) {
    this.options = options;
    this.canvas = null;
    this.ctx = null;
    this.w = 0;
    this.h = 0;
    this.tailList = [];
    this.init();
  }

  private init(): void {
    this.canvas = this.createCanvas();
    this.ctx = this.canvas.getContext('2d');
    window.addEventListener('resize', this.handleResize.bind(this));
    window.addEventListener('mousemove', this.handleMove.bind(this));
    window.addEventListener('touchmove', this.handleMove.bind(this));
    this.appendToBody(this.canvas);
    this.handleResize();
    this.render();
  }

  private render(): void {
    const { ctx, w, h } = this;
    requestAnimationFrame(this.render.bind(this));
    ctx!.clearRect(0, 0, w, h);
    for (let i = 0; i < this.tailList.length; i++) {
      const tail = this.tailList[i];
      tail.render(ctx!);
      if (!tail.active) {
        this.tailList.splice(i, 1);
        i--;
      }
    }
  }

  private drawTail(x: number, y: number) {
    const { ctx, options } = this;
    const tail = createTail(options, { x, y });
    tail.render(ctx!);
    this.tailList.push(tail);
  }

  private handleResize(): void {
    this.w = this.canvas!.width = window.innerWidth;
    this.h = this.canvas!.height = window.innerHeight;
  }

  private handleMove(e: MouseEvent | TouchEvent): void {
    let x =
      e instanceof MouseEvent
        ? e.offsetX
        : e.changedTouches[0] && e.changedTouches[0].clientX;
    let y =
      e instanceof MouseEvent
        ? e.offsetY
        : e.changedTouches[0] && e.changedTouches[0].clientY;
    this.drawTail(x, y);
  }

  private createCanvas(): HTMLCanvasElement {
    const canvasEl: HTMLCanvasElement = document.createElement('canvas');
    canvasEl.id = 'canvas';
    canvasEl.style.cssText = `
      display:block;
      position:fixed;
      width:100vw;
      height:100vh;
      pointer-events:none;
    `;
    return canvasEl;
  }

  private appendToBody(el: HTMLElement): void {
    document.body.appendChild(el);
  }
}

export const createMouseTailing = (
  options: Options = { type: 0 }
): MouseTailing => {
  return new MouseTailing(options);
};
