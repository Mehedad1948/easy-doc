import * as esbuild from 'esbuild-wasm';
import { useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import './index.css';

import CodeCell from './components/code-cell';
import TextEditor from './components/text-editor';

const App = () => {
  const [isInitiated, setIsInitiated] = useState(false);
  const [builder, setBuilder] = useState<any>(null);

  const startService = async () => {
    if (!isInitiated || !builder) {
      const service = await esbuild.initialize({
        // wasmURL: '/esbuild.wasm',
        wasmURL: 'https://unpkg.com/esbuild-wasm/esbuild.wasm',
      });
      setBuilder(esbuild);
      setIsInitiated(true);
    }
  };

  useEffect(() => {
    startService();
  }, []);

  return (
    <Provider store={store}>
      <div className=' divide-slate-500 h-full bg-slate-800 '>
        <CodeCell builder={builder} />
        {/* <CodeCell builder={ref.current} /> */}
        <TextEditor />
      </div>
    </Provider>
  );
};

ReactDOM.render(<App />, document.querySelector('#root'));
