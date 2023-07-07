export interface ITail {
  render(ctx: CanvasRenderingContext2D): void;
  active: boolean;
}

export interface IEffect extends Pick<ITail, 'render'> {
  effect(params: any): void;
}

export interface IDestroy {
  destroy(): void;
}

export type TailType = 'star' | 'circle' | 'heart' | 'icon';
export type EffectType = 'sky';

export interface TailConfig {
  el?: HTMLElement | string;
  color?: string;
  type?: TailType;
  count?: number;
  duration?: number;
  url?: string;
  className?: string;
  resource?: CanvasImageSource;
}

export interface EffectConfig extends Omit<TailConfig, 'type' | 'resource'> {
  type?: EffectType;
}

export interface Position {
  x: number;
  y: number;
}
