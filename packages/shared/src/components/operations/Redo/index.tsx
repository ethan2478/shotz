import { useCallback } from 'react';
import { OperationButton } from '@components';
import useHistory from '@hooks/useHistory';
import useLang from '@hooks/useLang';

const Redo = () => {
  const lang = useLang();
  const [history, historyDispatcher] = useHistory();

  const onClick = useCallback(() => {
    historyDispatcher.redo();
  }, [historyDispatcher]);

  return (
    <OperationButton
      title={lang.operation_redo_title}
      icon="icon-shotz-stroke-thin-forward"
      disabled={
        !history.stack.length || history.stack.length - 1 === history.index
      }
      onClick={onClick}
    />
  );
};

export default Redo;
