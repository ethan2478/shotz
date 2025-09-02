import { useCallback } from 'react';
import useStore from '@hooks/useStore';
import useCall from '@hooks/useCall';
import useCanvasContextRef from '@hooks/useCanvasContextRef';
import useHistory from '@hooks/useHistory';
import useReset from '@hooks/useReset';
import { OperationButton } from '@components';
import { composeImage } from '@utils';

const Ok = () => {
  const { image, bounds, lang } = useStore();
  const canvasContextRef = useCanvasContextRef();
  const canvasResultCtx = canvasContextRef.current?.resultCtx;
  const [, historyDispatcher] = useHistory();
  const call = useCall();
  const reset = useReset();

  const onClick = useCallback(() => {
    historyDispatcher.clearSelect();
    setTimeout(() => {
      if (!canvasResultCtx || !image || !bounds) {
        return;
      }
      composeImage(canvasResultCtx).then(blob => {
        call('onOk', blob, bounds);
        reset();
      });
    });
  }, [canvasResultCtx, historyDispatcher, image, bounds, call, reset]);

  return (
    <OperationButton
      title={lang.operation_ok_title}
      icon="icon-stroke-thin-check"
      onClick={onClick}
    />
  );
};

export default Ok;
