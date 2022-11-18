import type { TailType } from './types';
export const getFilter = (type: TailType): string => {
  if (['circle', 'heart', 'star'].includes(type)) {
    return 'filter:contrast(200%) brightness(200%);';
  }
  return '';
};
