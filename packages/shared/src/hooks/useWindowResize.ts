import { useEffect } from 'react';
import useLatestRef from '@hooks/useLatestRef';
import { debounce } from '@utils';

const useWindowResize = (cb: () => void, enableDebounce = true): void => {
  const cbRef = useLatestRef(cb);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const cbRunner = () => cbRef.current();

    const handler = enableDebounce ? debounce(cbRunner, 200) : cbRunner;

    window.addEventListener('resize', handler);

    return () => {
      window.removeEventListener('resize', handler);
    };
  }, [cbRef, enableDebounce]);
};

export default useWindowResize;
