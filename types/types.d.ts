export interface ITail {
    render(ctx: CanvasRenderingContext2D): void;
    active: boolean;
}
export type TailType = 'star' | 'circle' | 'heart' | 'icon' | 'sky';
export interface Options {
    el?: HTMLElement | string;
    type?: TailType;
    count?: number;
    duration?: number;
    url?: string;
    className?: string;
    resource?: CanvasImageSource;
}
export interface Position {
    x: number;
    y: number;
}
