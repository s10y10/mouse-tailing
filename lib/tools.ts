import type {
  EffectConfig,
  EffectType,
  Position,
  TailConfig,
  TailType,
} from '@/types';

export const formatEvent = (e: MouseEvent | TouchEvent): Position => {
  const x =
    e instanceof MouseEvent
      ? e.pageX
      : e.changedTouches[0] && e.changedTouches[0].pageX;
  const y =
    e instanceof MouseEvent
      ? e.pageY
      : e.changedTouches[0] && e.changedTouches[0].pageY;
  return { x, y };
};

/**
 * 随机一个6位16进制的颜色
 * @returns {string} 随机出的颜色
 */
export const getRandomColor = (): string => {
  const colorStr = `000000${Math.round(Math.random() * 0xffffff).toString(
    16
  )}`.slice(-6);
  return `#${colorStr}`;
};

/**
 * 添加元素到容器上
 * @param container 要添加的canvas
 * @param child canvas的容器
 */
export const appendChild = (container: HTMLElement, child: HTMLElement) => {
  container.appendChild(child);
};

export const getFilter = (type: TailType | EffectType): string => {
  if (['circle', 'heart', 'star', 'sky'].includes(type)) {
    return 'filter:contrast(200%) brightness(200%);';
  }
  return '';
};

/**
 * 创建canvas
 * @returns {HTMLCanvasElement} Canvas对象
 */
export const createCanvas = ({
  type,
  className,
}: EffectConfig | TailConfig): HTMLCanvasElement => {
  const canvasEl: HTMLCanvasElement = document.createElement('canvas');
  canvasEl.className = className!;
  canvasEl.style.cssText = `
    display:block;
    position:absolute;
    width:100%;
    height:100%;
    pointer-events:none;
    left:0;
    top:0;
    z-index:99999;
    ${getFilter(type!)}
  `;
  return canvasEl;
};
