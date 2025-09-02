import { useCallback } from 'react';
import useBounds from '@hooks/useBounds';
import useCursor from '@hooks/useCursor';
import useEmiter from '@hooks/useEmiter';
import useHistory from '@hooks/useHistory';
import useOperation from '@hooks/useOperation';

export type ResetDispatcher = () => void;

export default function useReset(): ResetDispatcher {
  const emiter = useEmiter();
  const [, boundsDispatcher] = useBounds();
  const [, cursorDispatcher] = useCursor();
  const [, historyDispatcher] = useHistory();
  const [, operatioDispatcher] = useOperation();

  const reset = useCallback(() => {
    emiter.reset();
    historyDispatcher.reset();
    boundsDispatcher.reset();
    cursorDispatcher.reset();
    operatioDispatcher.reset();
  }, [
    emiter,
    historyDispatcher,
    boundsDispatcher,
    cursorDispatcher,
    operatioDispatcher,
  ]);

  return reset;
}
