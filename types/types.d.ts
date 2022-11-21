export interface ITail {
    render(ctx: CanvasRenderingContext2D): void;
    active: boolean;
}
export declare type TailType = 'star' | 'circle' | 'heart' | 'icon';
export interface Options {
    type?: TailType;
    count?: number;
    duration?: number;
    url?: string;
    resource?: CanvasImageSource;
}
export interface Position {
    x: number;
    y: number;
}
