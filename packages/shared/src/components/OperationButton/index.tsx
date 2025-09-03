import React, {
  memo,
  PointerEvent,
  ReactNode,
  useCallback,
  useEffect,
  useRef,
} from 'react';
import { classnames } from '@utils';
import { useOperationsContext } from '@context';
import { useOperation } from '@hooks';
import OperationButtonOptions from '../OperationButtonOptions';
import styles from './index.module.less';

interface OperationButtonProps {
  title: string;
  icon: string | React.ReactElement;
  checked?: boolean;
  disabled?: boolean;
  option?: ReactNode;
  onClick?: (e: PointerEvent<HTMLDivElement>) => unknown;
}

const OperationButton: React.FC<OperationButtonProps> = ({
  title,
  icon,
  checked,
  disabled,
  option,
  onClick,
}) => {
  const btnRef = useRef<HTMLDivElement>(null);
  const operation = useOperation();
  const { setCurrentOperationBtn } = useOperationsContext();

  const onButtonClick = useCallback(
    (e: PointerEvent<HTMLDivElement>) => {
      if (disabled || !onClick) {
        return;
      }

      setCurrentOperationBtn(e.currentTarget);
      onClick(e);
    },
    [disabled, onClick, setCurrentOperationBtn],
  );

  useEffect(() => {
    if (checked && operation && btnRef.current) {
      setCurrentOperationBtn(btnRef.current);
    }
  }, [operation, checked, setCurrentOperationBtn]);

  return (
    <OperationButtonOptions open={checked} content={option}>
      <div
        ref={btnRef}
        className={classnames(styles.oprationButton, {
          [styles.checked]: checked,
          [styles.disabled]: disabled,
        })}
        title={title}
        onClick={onButtonClick}
      >
        {React.isValidElement(icon) ? (
          icon
        ) : (
          <span className={classnames(icon, styles['shotz-iconfont'])} />
        )}
      </div>
    </OperationButtonOptions>
  );
};

export default memo(OperationButton);
