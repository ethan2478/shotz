import { useLayoutEffect } from 'react';
import type { Theme } from '@types';

const useDataThemeSetter = (theme: Theme) => {
  useLayoutEffect(() => {
    document.documentElement.setAttribute('data-shotz-theme', theme);
  }, [theme]);
};

export default useDataThemeSetter;
