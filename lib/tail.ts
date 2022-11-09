import { TAIL_TYPE } from './consts';
import type { ITail, Options } from './type';
import Star from './star';

export const createTail = (type: number, options: Options): ITail => {
  switch (type) {
    case TAIL_TYPE.STAR:
      return new Star(options);
    default:
      return new Star(options);
  }
};
