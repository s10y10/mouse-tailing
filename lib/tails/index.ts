import type { ITail, Position, TailConfig } from '../types';
import Star from './star';
import Circle from './circle';
import Icon from './icon';
import Heart from './heart';
import Sky from './sky';

export const createTail = (options: TailConfig, position: Position): ITail => {
  const { type } = options;
  switch (type) {
    case 'star':
      return new Star(options, position);
    case 'circle':
      return new Circle(options, position);
    case 'icon':
      return new Icon(options, position);
    case 'heart':
      return new Heart(options, position);
    case 'sky':
      return new Sky(options, position);
    default:
      return new Star(options, position);
  }
};
