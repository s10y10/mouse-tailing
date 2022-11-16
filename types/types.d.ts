export interface ITail {
    render(ctx: CanvasRenderingContext2D): void;
    active: boolean;
}
export declare type Options = {
    type: number;
};
export declare type TailOptions = {
    x: number;
    y: number;
    [props: string]: any;
};
