export interface ITail {
  render(ctx: CanvasRenderingContext2D): void;
  active: boolean;
}

export type Options = {
  type: number;
};

export type TailOptions = {
  x: number;
  y: number;
  [props: string]: any;
};
