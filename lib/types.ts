export interface ITail {
  render(ctx: CanvasRenderingContext2D, pos?: Position): void;
  active: boolean;
}

export type TailType = 'star' | 'circle' | 'heart' | 'icon' | 'sky';

export interface Options {
  el?: HTMLElement;
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
