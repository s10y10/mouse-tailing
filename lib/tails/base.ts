import type { ITail, Options, Position } from '../types';

export default abstract class BaseTail implements ITail {
  protected x: number; //x轴坐标
  protected y: number; //y轴坐标
  protected vx: number; //x轴速度
  protected vy: number; //y轴速度
  protected scale: number; //缩放大小
  protected opacity: number; //透明度
  protected angle: number; //角度
  protected va: number; //角速度
  protected vo: number; //透明度变化速度
  protected options: Options; //参数
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
    this.vo = 1000 / this.options.duration! / 60;
    this.active = true;
  }

  abstract render(ctx: CanvasRenderingContext2D): void;
}
