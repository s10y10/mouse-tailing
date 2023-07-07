import BaseElement from '@/base/BaseElement';
import { EffectConfig, IEffect } from '@/types';
import { createTail } from './factory';
class GroundEffect extends BaseElement<IEffect, EffectConfig> {
  constructor(options: EffectConfig) {
    super(options);
    this.setup();
    this.initDraw();
  }

  /**
   * 初始绘制
   */
  private initDraw() {
    const { count } = this.options;
    for (let i = 0; i < count!; i++) {
      const tail = createTail(this.options, { x: 0, y: 0 });
      this.tailList.push(tail);
    }
  }

  /**
   * 循环调用渲染方法
   */
  protected render(): void {
    const { ctx, w, h } = this;
    ctx!.clearRect(0, 0, w, h);
    for (let i = 0; i < this.tailList!.length; i++) {
      const tail = this.tailList![i];
      tail.render(ctx!);
    }
    this.rafId = requestAnimationFrame(this.render);
  }

  /**
   * 添加尾巴
   * @param {number} x x坐标
   * @param {number} y y坐标
   */
  protected drawTail(x: number, y: number) {
    this.tailList!.forEach((tail) => {
      tail.effect({ x, y });
    });
  }
}

export default GroundEffect;
