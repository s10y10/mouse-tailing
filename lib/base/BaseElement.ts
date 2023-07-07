import { appendChild, createCanvas, formatEvent } from '@/tools';
import type { EffectConfig, IDestroy, TailConfig } from '@/types';

class BaseElement<T, K extends TailConfig | EffectConfig> implements IDestroy {
  protected canvas: HTMLCanvasElement | null = null;
  protected ctx: CanvasRenderingContext2D | null = null;
  protected rafId: number = -1;
  protected w: number = 0;
  protected h: number = 0;
  protected container: HTMLElement | null = document.body;
  protected tailList: Array<T> = [];
  protected options: K;
  constructor(options: K) {
    this.options = options;
  }

  /**
   * 准备工作
   */
  protected setup() {
    this.initContainer(this.options.el);
    this.bindFunction();
    this.initCanvas(this.options);
    this.initEvents();
    this.handleResize();
    this.render();
  }

  /**
   * 设置画布容器
   */
  protected initContainer(el: HTMLElement | string | undefined) {
    if (typeof el === 'string') {
      this.container = document.querySelector(el) || this.container;
    } else if (el) {
      this.container = el;
    }
  }

  /**
   * 初始化canvas并添加到body上
   */
  protected initCanvas(options: K): void {
    this.canvas = createCanvas(options);
    this.ctx = this.canvas.getContext('2d');
    appendChild(this.container!, this.canvas);
  }

  /**
   * 重置canvas的宽高
   */
  protected handleResize(): void {
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
  protected handleMove(e: MouseEvent | TouchEvent): void {
    let { x, y } = formatEvent(e);
    x = x - this.container!.offsetLeft;
    y = y - this.container!.offsetTop;
    this.drawTail(x, y);
  }

  /**
   * 给部分需要调用的方法绑定this
   */
  protected bindFunction(): void {
    this.handleResize = this.handleResize.bind(this);
    this.handleMove = this.handleMove.bind(this);
    this.render = this.render.bind(this);
  }

  /**
   * 移除事件侦听
   */
  protected removeEvents(): void {
    window.removeEventListener('resize', this.handleResize);
    this.container!.removeEventListener('mousemove', this.handleMove);
    this.container!.removeEventListener('touchmove', this.handleMove);
  }

  /**
   * 添加事件侦听
   */
  protected initEvents(): void {
    window.addEventListener('resize', this.handleResize);
    this.container!.addEventListener('mousemove', this.handleMove);
    this.container!.addEventListener('touchmove', this.handleMove);
  }

  /**
   * 循环调用渲染方法,子类实现
   */
  protected render(): void {}
  /**
   * 添加尾巴,子类实现
   */
  protected drawTail(x: number, y: number): void {}

  /**
   * 销毁当元素
   */
  destroy() {
    cancelAnimationFrame(this.rafId);
    this.removeEvents();
    this.tailList!.length = 0;
    this.canvas!.width = 0;
    this.canvas!.height = 0;
    this.canvas!.remove();
    this.canvas = null;
    this.ctx = null;
    this.container = null;
  }
}

export default BaseElement;
