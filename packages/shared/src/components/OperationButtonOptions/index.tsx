import React, {
  memo,
  ReactElement,
  ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { createPortal } from 'react-dom';
import { useOperationsContext } from '@context';
import type { Position } from '@types';
import styles from './index.module.less';

interface OperationButtonOptionsProps {
  open?: boolean;
  content?: ReactNode;
  children: ReactElement;
}

export enum Placement {
  Bottom = 'bottom',
  Top = 'top',
}

const OperationButtonOptions: React.FC<OperationButtonOptionsProps> = ({
  open,
  content,
  children,
}) => {
  const { currentOperationBtn } = useOperationsContext();

  const [placement, setPlacement] = useState<Placement>(Placement.Bottom);
  const [position, setPosition] = useState<Position | null>(null);
  const [offsetX, setOffsetX] = useState<number>(0);

  const popoverRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const getPopoverEl = () => {
    if (!popoverRef.current) {
      popoverRef.current = document.createElement('div');
    }
    return popoverRef.current;
  };

  useEffect(() => {
    const $el = getPopoverEl();
    if (open) {
      document.body.appendChild($el);
    }

    return () => {
      $el.remove();
    };
  }, [open]);

  const updatePosition = useCallback(() => {
    if (!open || !currentOperationBtn || !contentRef.current) return;

    const currentOperationButtonRect =
      currentOperationBtn.getBoundingClientRect();

    // 视口宽高
    const vpWidth = document.documentElement.clientWidth;
    const vpHeight = document.documentElement.clientHeight;

    // 当前操作按钮的下边框中点坐标
    const midBottomX =
      currentOperationButtonRect.x + currentOperationButtonRect.width / 2;
    const midBottomY =
      currentOperationButtonRect.y + currentOperationButtonRect.height;

    // 当前操作按钮的上边框中点坐标
    const midTopY = currentOperationButtonRect.y;

    const contentRect = contentRef.current.getBoundingClientRect();

    // 默认展示在下方正中间
    let x = midBottomX - contentRect.width / 2;
    let y = midBottomY + 15;
    let offset = 0;
    let vPlacement = Placement.Bottom;

    if (x > vpWidth) {
      offset = x - vpWidth - contentRect.width;
      x = vpWidth - contentRect.width;
    }
    if (x < 0) {
      offset = x;
      x = 0;
    }
    if (x + contentRect.width > vpWidth) {
      offset = x;
      x = 0;
    }

    // 当放置在下面超过视口时，调整到上面
    if (y + contentRect.height > vpHeight) {
      y = midTopY - contentRect.height - 15;
      vPlacement = Placement.Top;
    }

    setOffsetX(offset);
    setPlacement(vPlacement);
    setPosition({ x, y });
  }, [open, currentOperationBtn]);

  useEffect(() => {
    updatePosition();
  }, [updatePosition]);

  return (
    <>
      {children}
      {open &&
        content &&
        createPortal(
          <div
            id="tinyReactImageEditorOperationButtonOptions"
            ref={contentRef}
            className={styles.operationButtonOptions}
            style={{
              visibility: position ? 'visible' : 'hidden',
              transform: `translate(${position?.x ?? 0}px, ${position?.y ?? 0}px)`,
            }}
            data-placement={placement}
          >
            <div className={styles['content-container']}>{content}</div>
            <div
              className={styles['option-arrow']}
              style={{ marginLeft: offsetX }}
            />
          </div>,
          getPopoverEl(),
        )}
    </>
  );
};

export default memo(OperationButtonOptions);
