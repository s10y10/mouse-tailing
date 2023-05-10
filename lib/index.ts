import MouseTailing from './tailing';
import { Options } from './types';

/**
 * 默认参数
 */
const defaultOptions: Options = {
  type: 'star',
  count: 1,
  duration: 1000,
  className: 'canvas-tailing',
};
/**
 * 创建鼠标拖尾
 * @param {Options} options 创建拖尾的配置项
 * @returns {MouseTailing} 返回拖尾对象
 */
export const createMouseTailing = (options?: Options): MouseTailing => {
  const mergeOptions = options
    ? Object.assign({}, defaultOptions, options)
    : defaultOptions;
  return new MouseTailing(mergeOptions);
};
