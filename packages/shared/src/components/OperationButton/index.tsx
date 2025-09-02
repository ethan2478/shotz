import React, { memo, PointerEvent, ReactNode, useCallback } from 'react';
import { classnames } from '@utils';
import { useOperationsContext } from '@context';
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
  const { currentOperationRef } = useOperationsContext();

  const onButtonClick = useCallback(
    (e: PointerEvent<HTMLDivElement>) => {
      if (disabled || !onClick) {
        return;
      }

      currentOperationRef.current = e.currentTarget;
      onClick(e);
    },
    [disabled, onClick, currentOperationRef],
  );

  return (
    <OperationButtonOptions open={checked} content={option}>
      <div
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
          <span className={classnames(icon, styles.iconfont)} />
        )}
      </div>
    </OperationButtonOptions>
  );
};

export default memo(OperationButton);
