import type { ITail, Position, TailConfig } from '@/types';
import Circle from './tails/circle';
import Heart from './tails/heart';
import Icon from './tails/icon';
import Star from './tails/star';

/**
 * 创建拖尾
 * @param options
 * @param position
 * @returns
 */
export const createTail = (options: TailConfig, position: Position): ITail => {
  const { type } = options;
  switch (type) {
    case 'star':
      return new Star(options, position);
    case 'circle':
      return new Circle(options, position);
    case 'icon':
      return new Icon(options, position);
    case 'heart':
      return new Heart(options, position);
    default:
      return new Star(options, position);
  }
};

/**
 * 如果是图片类型或者可以转为图片类型，优先进行加载
 * @param options
 * @returns
 */
export const loadResource = (options: TailConfig): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    const { type, url, color } = options;
    let resourceUrl: string | undefined = undefined;
    switch (type) {
      case 'icon': {
        resourceUrl = url;
        break;
      }
      case 'heart': {
        const svgColor = color || '#ff4022';
        const svgString = `<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 30 30" fill="${svgColor}">
        <path d="M12 21.35l-.65-.59C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.93 0 3.68.93 4.5 2.36C13.82 3.93 15.57 3 17.5 3c3.08 0 5.5 2.42 5.5 5.5 0 3.78-3.4 6.86-9.35 12.26L12 21.35z"/>
        </svg>`;
        resourceUrl = `data:image/svg+xml;base64,${window.btoa(svgString)}`;
        break;
      }
      default:
        break;
    }
    if (resourceUrl) {
      const img = new Image();
      img.onload = () => {
        options.resource = img;
        resolve(true);
      };
      img.onerror = reject;
      img.src = resourceUrl;
    } else {
      resolve(false);
    }
  });
};
