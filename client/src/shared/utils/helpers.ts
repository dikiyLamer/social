import { LocalStorageKeys } from '../constatnts/enums';

export namespace Helpers {
  export const getRandomColor = (): string => {
    const colors = ['#2aaeb1', '#131780', '#e34a94', '#50a280', '#f15894', '#533f27', '#9996b1'];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  export const getFirstLetters = (...names: string[]) => {
    return names
      .map((name) => name.slice(0, 1))
      .join('')
      .toUpperCase();
  };

  export const getAvatarBgColor = () => {
    const existColor = localStorage.getItem(LocalStorageKeys.AVATAR_BG_CLR);
    if (existColor) {
      return existColor;
    }
    const color = getRandomColor();
    localStorage.setItem(LocalStorageKeys.AVATAR_BG_CLR, color);
    return color;
  };
}
