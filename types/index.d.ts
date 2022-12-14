import { Options } from './types';
declare class MouseTailing {
    private canvas;
    private ctx;
    private w;
    private h;
    private tailList;
    private options;
    constructor(options: Options);
    /**
     * 初始化
     */
    private init;
    /**
     * 如果type是icon,先加载资源
     */
    private loadResource;
    /**
     * 给部分需要调用的方法绑定this
     */
    private bindFunction;
    /**
     * 初始化canvas并添加到body上
     */
    private initCanvas;
    /**
     * 添加事件侦听
     */
    private initEvents;
    /**
     * 循环调用渲染方法
     */
    private render;
    /**
     * 添加尾巴
     * @param {number} x x坐标
     * @param {number} y y坐标
     */
    private drawTail;
    /**
     * 重置canvas的宽高
     */
    private handleResize;
    /**
     * 移动事件处理
     * @param e 事件参数
     */
    private handleMove;
    /**
     * 创建canvas,赋值样式
     * @returns {HTMLCanvasElement} Canvas对象
     */
    private createCanvas;
    /**
     * 添加元素到body上
     * @param el 要添加到body的元素
     */
    private appendToBody;
}
/**
 * 创建鼠标拖尾
 * @param {Options} options 创建拖尾的配置项
 * @returns {MouseTailing} 返回拖尾对象
 */
export declare const createMouseTailing: (options?: Options) => MouseTailing;
export {};
