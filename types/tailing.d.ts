import { Options } from './types';
declare class MouseTailing {
    private canvas;
    private ctx;
    private w;
    private h;
    private tailList;
    private options;
    private container;
    constructor(options: Options);
    /**
     * 初始化
     */
    private init;
    /**
     * 初始绘制
     */
    private initDraw;
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
     * 重置canvas的宽高
     */
    private handleResize;
    /**
     * 移动事件处理
     * @param e 事件参数
     */
    private handleMove;
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
}
export default MouseTailing;
