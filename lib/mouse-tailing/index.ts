import type { TailConfig } from '@/types';
import MouseTailing from './element';

/**
 * 默认参数
 */
const defaultOptions: TailConfig = {
  type: 'star',
  count: 1,
  duration: 1000,
  className: 'canvas-tailing',
};
/**
 * 创建鼠标拖尾
 * @param {TailConfig} options 创建拖尾的配置项
 * @returns {MouseTailing} 返回一个可销毁拖尾对象
 */
export const createMouseTailing = (options?: TailConfig): MouseTailing => {
  const mergeOptions: TailConfig = options
    ? Object.assign({}, defaultOptions, options)
    : defaultOptions;
  return new MouseTailing(mergeOptions);
};
