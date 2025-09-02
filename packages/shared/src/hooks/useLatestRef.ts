import { useRef } from 'react';

const useLatestRef = <T>(value: T) => {
  const ref = useRef<T>(value);

  ref.current = value;

  return ref;
};

export default useLatestRef;
