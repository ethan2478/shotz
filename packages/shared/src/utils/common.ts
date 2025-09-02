export const debounce = <F extends (...args: any[]) => any>(
  func: F,
  wait: number = 50,
): ((...args: Parameters<F>) => void) => {
  let timeout: ReturnType<typeof setTimeout> | undefined;

  return function (this: any, ...args: Parameters<F>) {
    if (timeout) clearTimeout(timeout);

    const self = this;
    timeout = setTimeout(() => {
      func.apply(self, args);
    }, wait);
  };
};
