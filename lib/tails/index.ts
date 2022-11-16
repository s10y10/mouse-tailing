import { TAIL_TYPE } from '../consts';
import type { ITail, TailOptions, Options } from '../types';
import Star from './star';

export const createTail = (
  options: Options,
  tailOptions: TailOptions
): ITail => {
  const { type } = options;
  switch (type) {
    case TAIL_TYPE.STAR:
      return new Star(tailOptions);
    default:
      return new Star(tailOptions);
  }
};
