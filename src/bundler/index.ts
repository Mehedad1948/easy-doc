import { useEffect } from 'react';
import * as esbuild from 'esbuild-wasm';
import { unpkgPathPlugin } from './plugins/unpkg-path-plugin';
import { fetchPlugin } from './plugins/fetch-plugin';

let service: void;
export const useEsbuildService = async () => {
  useEffect(() => {
    async function initiateEsbuild() {
      const service = await esbuild.initialize({
        // wasmURL: '/esbuild.wasm',
        wasmURL: 'https://unpkg.com/esbuild-wasm/esbuild.wasm',
      });
    }
    initiateEsbuild();
  }, []);

  const bundle = async (rawCode: string) => {
    return await esbuild.build({
      entryPoints: ['index.js'],
      bundle: true,
      write: false,
      plugins: [unpkgPathPlugin(), fetchPlugin(rawCode)],
      define: {
        'process.env.NODE_ENV': '"production"',
        global: 'window',
      },
    });
  };

  return bundle;
};
