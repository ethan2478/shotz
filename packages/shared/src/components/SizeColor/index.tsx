import React, { memo } from 'react';
import Colors from '../Colors';
import Sizes from '../Sizes';
import styles from './index.module.less';

interface SizeColorProps {
  size: number;
  color: string;
  onSizeChange: (value: number) => void;
  onColorChange: (value: string) => void;
}

const SizeColor: React.FC<SizeColorProps> = ({
  size,
  color,
  onSizeChange,
  onColorChange,
}) => {
  return (
    <div className={styles.sizeColor}>
      <Sizes value={size} onChange={onSizeChange} />
      <Colors value={color} onChange={onColorChange} />
    </div>
  );
};

export default memo(SizeColor);
