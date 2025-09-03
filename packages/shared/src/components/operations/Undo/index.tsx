import { memo, useCallback } from 'react';
import { OperationButton } from '@components';
import useHistory from '@hooks/useHistory';
import useLang from '@hooks/useLang';

const Undo = () => {
  const lang = useLang();
  const [history, historyDispatcher] = useHistory();

  const onClick = useCallback(() => {
    historyDispatcher.undo();
  }, [historyDispatcher]);

  return (
    <OperationButton
      title={lang.operation_undo_title}
      icon="icon-shotz-stroke-thin-quote"
      disabled={history.index === -1}
      onClick={onClick}
    />
  );
};

export default memo(Undo);
