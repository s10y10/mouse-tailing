import { ITail, Options } from './types';
import { createTail } from './tails';
import { getFilter } from './filters';

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

  /**
   * 初始化
   */
  private async init(): Promise<void> {
    await this.loadResource();
    this.initCanvas();
    this.bindFunction();
    this.initEvents();
    this.handleResize();
    this.render();
  }

  /**
   * 如果type是icon,先加载资源
   */
  private loadResource() {
    return new Promise((resolve, reject) => {
      const { type, url } = this.options;
      if (type === 'icon' && url) {
        const img = new Image();
        img.onload = () => {
          this.options.resource = img;
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
    this.canvas = this.createCanvas();
    this.ctx = this.canvas.getContext('2d');
    this.appendCanvas(this.canvas, this.options.el || document.body);
  }

  /**
   * 添加事件侦听
   */
  private initEvents(): void {
    window.addEventListener('resize', this.handleResize);
    window.addEventListener('mousemove', this.handleMove);
    window.addEventListener('touchmove', this.handleMove);
  }

  /**
   * 循环调用渲染方法
   */
  private render(): void {
    const { ctx, w, h } = this;
    ctx!.clearRect(0, 0, w, h);
    for (let i = 0; i < this.tailList.length; i++) {
      const tail = this.tailList[i];
      tail.render(ctx!);
      if (!tail.active) {
        this.tailList.splice(i, 1);
        i--;
      }
    }
    requestAnimationFrame(this.render);
  }

  /**
   * 添加尾巴
   * @param {number} x x坐标
   * @param {number} y y坐标
   */
  private drawTail(x: number, y: number) {
    const { ctx, options } = this;
    const { count } = options;
    for (let i = 0; i < count!; i++) {
      const tail = createTail(ctx!, options, { x, y });
      this.tailList.push(tail);
    }
  }

  /**
   * 添加连线
   * @param {number} x x坐标
   * @param {number} y y坐标
   */
  private drawLine(x: number, y: number) {
    const { ctx, options } = this;
    const { count } = options;
    if (this.tailList.length === 0) {
      for (let i = 0; i < count!; i++) {
        const tail = createTail(ctx!, options, { x, y });
        this.tailList.push(tail);
      }
    } else {
      this.tailList.forEach((tail) => {
        tail.render(ctx!, { x, y });
      });
    }
  }

  /**
   * 重置canvas的宽高
   */
  private handleResize(): void {
    this.w = this.canvas!.width = window.innerWidth;
    this.h = this.canvas!.height = window.innerHeight;
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

    if (this.options.type === 'sky') {
      this.drawLine(x, y);
    } else {
      this.drawTail(x, y);
    }
  }

  /**
   * 创建canvas,赋值样式
   * @returns {HTMLCanvasElement} Canvas对象
   */
  private createCanvas(): HTMLCanvasElement {
    const canvasEl: HTMLCanvasElement = document.createElement('canvas');
    canvasEl.id = 'canvas';
    canvasEl.style.cssText = `
      display:block;
      position:absolute;
      width:100vw;
      height:100vh;
      pointer-events:none;
      left:0;
      top:0;
      z-index:99999;
      ${getFilter(this.options.type!)}
    `;
    return canvasEl;
  }

  /**
   * 添加元素到body上
   * @param canvas 要添加的canvas
   * @param el canvas的容器
   */
  private appendCanvas(
    canvas: HTMLCanvasElement,
    el: HTMLElement | string
  ): void {
    try {
      if (typeof el === 'string') {
        const container = document.querySelector(el);
        container && container.appendChild(canvas);
      } else {
        el.appendChild(canvas);
      }
    } catch (e) {
      console.error(e);
    }
  }
}

/**
 * 默认参数
 */
const defaultOptions: Options = {
  type: 'star',
  count: 1,
  duration: 1000,
};
/**
 * 创建鼠标拖尾
 * @param {Options} options 创建拖尾的配置项
 * @returns {MouseTailing} 返回拖尾对象
 */
export const createMouseTailing = (options?: Options): MouseTailing => {
  const mergeOptions = options
    ? Object.assign(defaultOptions, options)
    : defaultOptions;
  return new MouseTailing(mergeOptions);
};
