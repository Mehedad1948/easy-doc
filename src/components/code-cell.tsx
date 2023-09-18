import * as esbuild from 'esbuild-wasm';
import { useState, useEffect, useRef } from 'react';
import { unpkgPathPlugin } from '../bundler/plugins/unpkg-path-plugin';
import { fetchPlugin } from '../bundler/plugins/fetch-plugin';
import Button from './Button';
import CodeEditor from './code-editor';
import Preview from './preview';
import Resizable from './resizable';
import './code-cell.css';

const CodeCell = ({ builder }: any) => {
  const [input, setInput] = useState<any>('');
  const [codeObj, setCodeObj] = useState({
    code: '',
    err: ''
  });

  const onClick = async () => {};

  useEffect(() => {
    if (builder) {
      const initiateBuilder = async () => {

      try {
          const result = await builder.build({
            entryPoints: ['index.js'],
            bundle: true,
            write: false,
            plugins: [unpkgPathPlugin(), fetchPlugin(input)],
            define: {
              'process.env.NODE_ENV': '"production"',
              global: 'window',
            },
          });

          setCodeObj({
            code: result.outputFiles[0].text,
            err: ''
          });

      } catch (err: any) {
        setCodeObj({
          code: '',
          err: err.message
        });
      }
    }
    initiateBuilder()
    }
  }, [input]);

  return (
    <Resizable direction='vertical'>
      {/* 
    <div className='h-full px-4 pt-4 bg-slate-800'>
      <div className='h-full sm:h-1/2 flex flex-col'> */}
      <div className='flex  h-full sm:flex-wrap sm:flex-row flex-col gap-2 grow pt-4'>
        <Resizable direction='horizontal'>
          <CodeEditor
            setValue={(value) => setInput(value)}
            initialValue='console.log("test")'
          />
        </Resizable>

        {/* <textarea
            className='border border-slate-300 grow rounded-md  
            shrink-0 focus:outline-none p-3'
            value={input}
            onChange={(e) => setInput(e.target.value)}
          ></textarea> */}

        <div className='h-full flex relative grow  pointer-events-none preview-wrapper'>
          <Preview codeProp={codeObj} />
        </div>
      </div>
      {/* <div className='flex items-center flex-wrap gap-3 py-1'>
          <Button onClick={onClick}>Submit</Button>
        </div> */}
      {/* </div>
    </div> */}
    </Resizable>
  );
};

export default CodeCell;
