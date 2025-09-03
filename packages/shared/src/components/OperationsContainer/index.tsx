import React, {
  memo,
  MouseEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import useBounds from '@hooks/useBounds';
import useStore from '@hooks/useStore';
import { default as OperationButtons } from '@components/operations';
import type { Position } from '@types';
import useWindowResize from '@hooks/useWindowResize';
import useOperation from '@hooks/useOperation';
import useCursor from '@hooks/useCursor';
import { classnames } from '@utils';
import { OperationsContextContainer } from '@context';
import '@icons/iconfont.css';
import styles from './index.module.less';

interface OperationsProps {
  className?: string;
}

const OperationsContainer: React.FC<OperationsProps> = ({ className }) => {
  const { imageElRef } = useStore();
  const [bounds] = useBounds();
  const [, operationDispatcher] = useOperation();
  const [, cursorDispatcher] = useCursor();
  const [position, setPosition] = useState<Position | null>(null);

  const elRef = useRef<HTMLDivElement>(null);

  const onDoubleClick = useCallback((e: MouseEvent) => {
    e.stopPropagation();
  }, []);

  const onContextMenu = useCallback((e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const resetOperation = useCallback(() => {
    operationDispatcher.reset();
    cursorDispatcher.reset();
  }, [operationDispatcher, cursorDispatcher]);

  // 位置调整
  const updatePosition = useCallback(() => {
    if (!bounds || !elRef.current || !imageElRef.current) {
      return;
    }

    const containerRef = imageElRef.current.getBoundingClientRect();
    const elRect = elRef.current.getBoundingClientRect();

    // 右下角坐标
    const rightBottomX = containerRef.x + containerRef.width;
    const rightBottomY = containerRef.y + containerRef.height;

    // 视口宽高
    const vpWidth = document.documentElement.clientWidth;
    const vpHeight = document.documentElement.clientHeight;

    // 计算操作栏坐标
    let x = rightBottomX - elRect.width;
    let y = rightBottomY + 10;

    if (x < 0) {
      x = 10;
    }
    if (x < rightBottomX - elRect.width) {
      x = rightBottomX - elRect.width;
    }
    if (x > vpWidth) {
      x = vpWidth - 10;
    }

    if (y < 0) {
      y = 10;
    }
    if (y > vpHeight) {
      y = vpHeight - elRect.height - 10;
    }

    // 超过1px再更新
    if (
      !position ||
      Math.abs(position.x - x) > 1 ||
      Math.abs(position.y - y) > 1
    ) {
      setPosition({ x, y });
      resetOperation();
    }
  }, [imageElRef, position, bounds, resetOperation]);

  useEffect(() => {
    updatePosition();
  }, [updatePosition]);

  const onWindowResize = useCallback(() => {
    updatePosition();
  }, [updatePosition]);

  useWindowResize(onWindowResize);
  // TODO: 监听页面滚动，并触发updatePosition函数

  if (!bounds) {
    return null;
  }

  return (
    <OperationsContextContainer>
      <div
        ref={elRef}
        className={styles.operations}
        style={{
          visibility: position ? 'visible' : 'hidden',
          transform: `translate(${position?.x ?? 0}px, ${position?.y ?? 0}px)`,
        }}
        onDoubleClick={onDoubleClick}
        onContextMenu={onContextMenu}
      >
        <div className={classnames(styles.operationsButtons, className)}>
          {OperationButtons.map((OperationButton, index) => {
            if (OperationButton === '|') {
              return <div key={index} className={styles.operationDivider} />;
            } else {
              return <OperationButton key={index} />;
            }
          })}
        </div>
      </div>
    </OperationsContextContainer>
  );
};

export default memo(OperationsContainer);
