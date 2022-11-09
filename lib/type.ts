export interface ITail {
  render(ctx: CanvasRenderingContext2D): void;
  active: boolean;
}

export type Options = {
  x: number;
  y: number;
};
