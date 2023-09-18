import * as esbuild from 'esbuild-wasm';
import { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import { unpkgPathPlugin } from './bundler/plugins/unpkg-path-plugin';
import { fetchPlugin } from './bundler/plugins/fetch-plugin';
import './index.css';
import Button from './components/Button';
import CodeEditor from './components/code-editor';



const App = () => {
  const ref = useRef<any>();
  const [input, setInput] = useState<any>('');
  // const [code, setCode] = useState('');
  const iframe = useRef<any>();

  const startService = async () => {
    const service = await esbuild.initialize({
      // wasmURL: '/esbuild.wasm',
      wasmURL: 'https://unpkg.com/esbuild-wasm/esbuild.wasm',
    });
    ref.current = esbuild;
  };

  useEffect(() => {
    startService();
  }, []);

  const onClick = async () => {
    if (!ref.current) {
      return;
    }

    // const result = await ref.current.transform(input, {
    //   loader: 'jsx',
    //   target: 'es2015',
    // });

    iframe.current.srcdoc = html;

    const result = await ref.current.build({
      entryPoints: ['index.js'],
      bundle: true,
      write: false,
      plugins: [unpkgPathPlugin(), fetchPlugin(input)],
      define: {
        'process.env.NODE_ENV': '"production"',
        global: 'window',
      },
    });

    // setCode(result.outputFiles[0].text);
    iframe.current.contentWindow.postMessage(result.outputFiles[0].text, '*');
  };

  const html = `
 <html>
 <head></head>
 <body>
 <div id="root"> </div>
 <script>
  window.addEventListener('message', (event) => {
    console.log(event.data)
    try{
      eval(event.data)
    } catch(err) {
       const root = document.querySelector('#root')
       root.innerHTML =  '<div style="color: red;"><h4>Runtime Error:</h4>' + err + '</div>'
       console.error(err)
    }
  })
 </script>
 </body>
 </html>
`;

  return (
    <div className=' h-full px-4 '>
      <div className='h-full sm:h-1/2 flex flex-col'>
        <div>
          <CodeEditor
            setValue={(value) => setInput(value)}
            initialValue='import React from "react"'
          />
        </div>

        <div className='flex sm:flex-wrap sm:flex-row flex-col gap-2 grow items-stretch py-4'>
          <textarea
            className='border border-slate-300 grow rounded-md  
            shrink-0 focus:outline-none p-3'
            value={input}
            onChange={(e) => setInput(e.target.value)}
          ></textarea>
          <iframe
            title='preview'
            ref={iframe}
            className='border border-slate-300 rounded-md grow  shrink-0 '
            srcDoc={html}
            // sandbox='allow-scripts'
            // src='/test.html'
          />
        </div>
        <div className='flex items-center flex-wrap gap-3 py-1'>
          <Button onClick={onClick}>Submit</Button>
          <Button onClick={() => setInput("import 'tiny-test-pkg'")}>
            Import JS
          </Button>
          <Button onClick={() => setInput("import 'bulma/css/bulma.css'")}>
            Import CSS
          </Button>
          <Button
            onClick={() =>
              setInput(`import 'bulma/css/bulma.css' 
import 'tiny-test-pkg'`)
            }
          >
            Import JS & CSS
          </Button>
          <Button onClick={() => setInput("console.log('test')")}>
            Test Log
          </Button>
        </div>
      </div>

      {/* <div className='flex py-4 gap-2 flex-wrap items-stretchh-full'>
      <pre className='border p-3 bg-slate-50 min-w-[50%] rounded grow min-h-full'>
          {input}
        </pre> 
     </div> */}
    </div>
  );
};

ReactDOM.render(<App />, document.querySelector('#root'));
