import { useRef } from 'react';
import MonacoEditor from '@monaco-editor/react';
import * as prettier from 'prettier/standalone';
import * as prettierPluginBabel from 'prettier/plugins/babel'
import Button from './Button';
// import codeShift from 'jscodeshift';
// import Highlighter from 'monaco-jsx-highlighter';

interface CodeEditorProps {
  initialValue: string;
  setValue(value: string | undefined): void;
}

const CodeEditor: React.FC<CodeEditorProps> = ({ initialValue, setValue }) => {
  const editorRef = useRef<any>();

  const onFormatClick = () => {
    // const highlighter = new Highlighter(
    //   //  @ts-ignore
    //   window.MonacoEnvironment,
    //   codeShift,
    //   MonacoEditor
    // );
    // highlighter.highlightOnDidChangeModelContent()

    const unformatted = editorRef.current.getModel().getValue();
// console.log(unformatted);

    // const formatted = prettier.format(unformatted, {
    //   parser: 'babel',
    //   // plugins: [prettierPluginBabel],
    //   useTabs: false,
    //   semi: true,
    //   singleQuote: true,
    // });
    // editorRef.current.setValue(formatted)
  };

  return (
    <div className='relative group  grow h-full rounded-lg overflow-hidden'>
      <Button
        className='absolute top-2 right-2 z-10 opacity-0 group-hover:opacity-100
                    transition-opacity duration-300'
        onClick={onFormatClick}
      >
        {' '}
        Format
      </Button>
      <MonacoEditor
        onMount={(editor, MonacoEditor) => (editorRef.current = editor)}
        onChange={setValue}
        value={initialValue}
        theme='vs-dark'
        language='javascript'
        height='100%'
        options={{
          tabSize: 2,
          wordWrap: 'on',
          minimap: { enabled: false },
          showUnused: false,
          folding: false,
          lineNumbersMinChars: 3,
          fontSize: 18,
          // scrollBeyondLastLine: false,
          automaticLayout: true,
        }}
      />
    </div>
  );
};

export default CodeEditor;
