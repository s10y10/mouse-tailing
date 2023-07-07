import type { EffectConfig } from '@/types';
import GroundEffect from './element';

/**
 * 默认参数
 */
const defaultOptions: EffectConfig = {
  type: 'sky',
  count: 1,
  duration: 1000,
  className: 'canvas-tailing',
};
/**
 * 创建背景效果
 * @param {EffectConfig} options 创建背景效果的配置项
 * @returns {GroundEffect} 返回一个可销毁的背景效果对象
 */
export const createGroundEffect = (options?: EffectConfig): GroundEffect => {
  const mergeOptions = options
    ? Object.assign({}, defaultOptions, options)
    : defaultOptions;
  return new GroundEffect(mergeOptions);
};
