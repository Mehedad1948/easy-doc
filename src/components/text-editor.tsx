import MDEditor from '@uiw/react-md-editor';
import './text-editor.css';
import { useState, useEffect, useRef } from 'react';

const TextEditor: React.FC = () => {
  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState('**Hello world!!!**');
  const ref = useRef<any>();

  useEffect(() => {
    const listener = (event: MouseEvent) => {
      if (
        ref.current &&
        event.target &&
        ref.current.contains(event.target as Node)
      ) {
        setEditing(true);
        return;
      }
      setEditing(false);
    };
    document.addEventListener('click', listener, { capture: true });

    return () => {
      document.removeEventListener('click', listener, { capture: true });
    };
  }, []);

  if (editing) {
    return (
      <div ref={ref}>
        <MDEditor
          className='text-editor'
          value={value}
          onChange={(v) => setValue(v || '')}
        />
      </div>
    );
  }

  return (
    <div className='border p-4' onClick={() => setEditing(true)}>
      <MDEditor.Markdown className='text-editor' source={value} />
    </div>
  );
};

export default TextEditor;
