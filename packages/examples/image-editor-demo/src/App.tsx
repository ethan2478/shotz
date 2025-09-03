import ReactImageEditor from '@shotz/editor';
import type { Bounds, Theme } from '@shotz/shared';
import { useState } from 'react';
import Pic from './image.jpg';
import './App.less';

const App = () => {
  const [theme, setTheme] = useState<Theme>('light');
  const onOK = (blob: Blob | null, bounds: Bounds) => {
    console.log('onOK==>>', blob);
    if (blob) {
      const url = URL.createObjectURL(blob);
      console.log(url);
      window.open(url);
    }
  };

  const onCancel = () => {
    console.log('onCancel==>>');
  };

  const onSave = (blob: Blob | null, bounds: Bounds) => {
    console.log('onSave==>>', blob);
    if (blob) {
      const url = URL.createObjectURL(blob);
      console.log(url);
      window.open(url);
    }
  };

  const onChangeTheme = () => {
    setTheme(prev => {
      if (prev === 'dark') {
        return 'light';
      }
      return 'dark';
    });
  };

  return (
    <div className="app-wrapper">
      <div className="app-container">
        <h1>React Image Editor Demo</h1>
        <button
          style={{
            width: '100px',
            height: '40px',
            borderRadius: '8px',
            cursor: 'pointer',
            marginBottom: '16px',
          }}
          onClick={onChangeTheme}
        >
          更改主题
        </button>
        <ReactImageEditor
          url={Pic}
          onOk={onOK}
          onCancel={onCancel}
          onSave={onSave}
          theme={theme}
        />
      </div>
    </div>
  );
};

export default App;
