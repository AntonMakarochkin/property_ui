export const debounce = <T extends any[]>(mainFunction: (...args: T) => void, delay: number) => {
  let timer: NodeJS.Timeout;

  return function (...args: T) {
    clearTimeout(timer);

    timer = setTimeout(() => {
      mainFunction(...args);
    }, delay);
  };
};