import type { TailType } from './types';
/**
 * 随机一个6位16进制的颜色
 * @returns {string} 随机出的颜色
 */
export declare const getRandomColor: () => string;
/**
 * 添加元素到容器上
 * @param container 要添加的canvas
 * @param child canvas的容器
 */
export declare const appendChild: (container: HTMLElement, child: HTMLElement) => void;
export declare const getFilter: (type: TailType) => string;
/**
 * 创建canvas
 * @returns {HTMLCanvasElement} Canvas对象
 */
export declare const createCanvas: (type: TailType) => HTMLCanvasElement;
