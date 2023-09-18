import { useEffect, useRef } from 'react';

interface PreviewProps {
  codeProp: {
    code: string;
    err: string;
  };
}

const html = `
<html>
<head></head>
<body>
<div id="root"> </div>
<script>

const handleError = (err) => {
  const root = document.querySelector('#root')
  root.innerHTML =  '<div style="color: red;"><h4>Runtime Error:</h4>' + err + '</div>'
  console.error(err)
}

window.addEventListener('error', (event)=> {
event.preventDefault()
handleError(event.error)
})

 window.addEventListener('message', (event) => {
   try{
     eval(event.data)
   } catch(err) {
      handleError(err)
   }
 })
</script>
</body>
</html>
`;

const Preview = ({ codeProp }: PreviewProps) => {
  const { code, err } = codeProp;
  const iframe = useRef<any>();

  useEffect(() => {
    if (iframe) {
      iframe.current.srcdoc = html;
      // Fot letting html to be settled and add message event listener
      setTimeout(() => {
        iframe.current.contentWindow.postMessage(code, '*');
      }, 50);
    }
  }, [code]);

  return (
    <>
      <iframe
        title='preview'
        ref={iframe}
        className='border h-full border-slate-600 bg-slate-100
      rounded-md grow  w-2'
        srcDoc={html}
      />
      {err && (
        <div className='text-rose-500 font-semibold w-full h-full absolute bg-sky-200 p-4'>
          <h2 className='text-lg font-bold mb-2'>Build Error:</h2>
          {err}
        </div>
      )}
    </>
  );
};

export default Preview;
