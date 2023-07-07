import BaseElement from '@/base/BaseElement';
import { ITail, TailConfig } from '@/types';
import { createTail, loadResource } from './factory';

class MouseTailing extends BaseElement<ITail, TailConfig> {
  constructor(options: TailConfig) {
    super(options);
    this.init();
  }

  /**
   * 初始化
   */
  private async init(): Promise<void> {
    await loadResource(this.options);
    this.setup();
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
      if (!tail.active) {
        this.tailList.splice(i, 1);
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
  protected drawTail(x: number, y: number) {
    const { options } = this;
    const { count } = options!;
    for (let i = 0; i < count!; i++) {
      const tail = createTail(options!, { x, y });
      this.tailList!.push(tail);
    }
  }
}

export default MouseTailing;
