import ReactDom from 'react-dom/client';
import App from './App';
import '@shotz/editor/index.css';

const root = ReactDom.createRoot(document.getElementById('root')!);
root.render(<App />);
