import { createTail } from './tails';
import { appendChild, createCanvas } from './tools';
import { ITail, Options } from './types';

import type Sky from './tails/sky';

class MouseTailing {
  private canvas: HTMLCanvasElement | null = null;
  private ctx: CanvasRenderingContext2D | null = null;
  private w: number = 0;
  private h: number = 0;
  private tailList: Array<ITail> | null = [];
  private options: Options | null;
  private container: HTMLElement | null = document.body;
  private rafId: number = -1;
  constructor(options: Options) {
    this.options = options;
    const { el } = this.options;
    if (typeof el === 'string') {
      this.container = document.querySelector(el) || this.container;
    }
    this.init();
  }

  /**
   * 初始化
   */
  private async init(): Promise<void> {
    await this.loadResource();
    this.bindFunction();
    this.initCanvas();
    this.initEvents();
    this.handleResize();
    this.initDraw();
    this.render();
  }

  /**
   * 初始绘制
   */
  private initDraw() {
    const { type } = this.options!;
    if (type === 'sky') {
      this.drawTail(0, 0);
    }
  }

  /**
   * 如果type是icon,先加载资源
   */
  private loadResource() {
    return new Promise((resolve, reject) => {
      const { type, url } = this.options!;
      if (type === 'icon' && url) {
        const img = new Image();
        img.onload = () => {
          this.options!.resource = img;
          resolve(true);
        };
        img.onerror = reject;
        img.src = url;
      } else {
        resolve(false);
      }
    });
  }

  /**
   * 给部分需要调用的方法绑定this
   */
  private bindFunction(): void {
    this.handleResize = this.handleResize.bind(this);
    this.handleMove = this.handleMove.bind(this);
    this.render = this.render.bind(this);
  }

  /**
   * 初始化canvas并添加到body上
   */
  private initCanvas(): void {
    this.canvas = createCanvas(this.options!);
    this.ctx = this.canvas.getContext('2d');
    appendChild(this.container!, this.canvas);
  }

  /**
   * 添加事件侦听
   */
  private initEvents(): void {
    window.addEventListener('resize', this.handleResize);
    this.container!.addEventListener('mousemove', this.handleMove);
    this.container!.addEventListener('touchmove', this.handleMove);
  }

  /**
   * 移除事件侦听
   */
  private removeEvents(): void {
    window.removeEventListener('resize', this.handleResize);
    this.container!.removeEventListener('mousemove', this.handleMove);
    this.container!.removeEventListener('touchmove', this.handleMove);
  }

  /**
   * 重置canvas的宽高
   */
  private handleResize(): void {
    this.w = this.canvas!.width = this.container!.offsetWidth;
    this.h = this.canvas!.height = this.container!.offsetHeight;
    if (this.w === 0 || this.h === 0) {
      throw new Error('canvas容器的offsetWidth和offsetHeight不能为0!');
    }
  }

  /**
   * 移动事件处理
   * @param e 事件参数
   */
  private handleMove(e: MouseEvent | TouchEvent): void {
    let x =
      e instanceof MouseEvent
        ? e.pageX
        : e.changedTouches[0] && e.changedTouches[0].pageX;
    let y =
      e instanceof MouseEvent
        ? e.pageY
        : e.changedTouches[0] && e.changedTouches[0].pageY;

    x = x - this.container!.offsetLeft;
    y = y - this.container!.offsetTop;
    this.drawTail(x, y);
  }

  /**
   * 循环调用渲染方法
   */
  private render(): void {
    const { ctx, w, h } = this;
    ctx!.clearRect(0, 0, w, h);
    for (let i = 0; i < this.tailList!.length; i++) {
      const tail = this.tailList![i];
      tail.render(ctx!);
      if (!tail.active) {
        this.tailList!.splice(i, 1);
        i--;
      }
    }
    this.rafId = requestAnimationFrame(this.render);
  }

  /**
   * 添加尾巴
   * @param {number} x x坐标
   * @param {number} y y坐标
   */
  private drawTail(x: number, y: number) {
    const { options } = this;
    const { count, type } = options!;
    if (type === 'sky') {
      this.tailList!.forEach((tail) => {
        (tail as Sky).setPos({ x, y });
      });
      if (this.tailList!.length) return;
    }
    for (let i = 0; i < count!; i++) {
      const tail = createTail(options!, { x, y });
      this.tailList!.push(tail);
    }
  }

  /**
   * 销毁当前拖尾
   */
  destroy() {
    cancelAnimationFrame(this.rafId);
    this.removeEvents();
    this.tailList!.length = 0;
    this.tailList = null;
    this.canvas!.width = 0;
    this.canvas!.height = 0;
    this.canvas!.remove();
    this.canvas = null;
    this.ctx = null;
    this.options = null;
    this.container = null;
  }
}

export default MouseTailing;
