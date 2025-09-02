export const classnames = (...args: Array<any>) => {
  return args
    .flatMap(arg => {
      if (!arg) return [];

      if (typeof arg === 'string') return arg;

      if (Array.isArray(arg)) return arg;

      if (typeof arg === 'object') {
        return Object.entries(arg)
          .filter(([, value]) => !!value)
          .map(([key]) => key);
      }
      return [];
    })
    .join(' ');
};
