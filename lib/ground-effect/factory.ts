import type { IEffect, Position, EffectConfig } from '@/types';
import Sky from './effects/sky';

export const createTail = (
  options: EffectConfig,
  position: Position
): IEffect => {
  const { type } = options;
  switch (type) {
    case 'sky':
      return new Sky(options, position);
    default:
      return new Sky(options, position);
  }
};
