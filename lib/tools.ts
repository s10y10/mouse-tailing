/**
 * 随机一个6位16进制的颜色
 * @returns {string} 随机出的颜色
 */
export const getRandomColor = (): string => {
  const colorStr = `000000${Math.round(Math.random() * 0xffffff).toString(
    16
  )}`.slice(-6);
  return `#${colorStr}`;
};
