import React, { memo } from 'react';
import { classnames } from '@utils';
import { colors } from '@constants';
import styles from './index.module.less';

interface ColorsProps {
  value: string;
  onChange: (value: string) => void;
}

const Colors: React.FC<ColorsProps> = ({ value, onChange }) => {
  return (
    <div className={styles.colors}>
      {colors.map(color => {
        return (
          <div
            key={color}
            className={classnames(styles.colorItem, {
              [styles.active]: color === value,
            })}
            style={{ backgroundColor: color }}
            onClick={() => onChange?.(color)}
          />
        );
      })}
    </div>
  );
};

export default memo(Colors);
