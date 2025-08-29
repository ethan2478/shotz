import { drawImage } from '@shotz/shared';
import './index.less';

const Editor = () => {
  return (
    <div className="editor-app">
      Hello Editor
      <button onClick={drawImage}>点击测试shared函数</button>
    </div>
  );
};

export default Editor;
