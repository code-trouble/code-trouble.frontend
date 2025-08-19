import { useRef, useState } from "react"
import ReactQuill, { Quill } from 'react-quill'
import "react-quill/dist/quill.snow.css";
import { Toolbar } from './Toolbar';


type Delta = ReturnType<InstanceType<typeof Quill>["getContents"]> | any; 

export const TextEditor = () => {
  const [content, setContent] = useState<Delta | null>(null);
  const quillRef = useRef<ReactQuill | null>(null);

  const modules = {
    toolbar: false,
    history: {userOnly: true},
  };


  const formats = [
    "bold", "italic", "underline", "strike",
    "code-block", "list", "bullet",
    "image", "video", "link"
  ]
  

  return (
    <div className="editor-container">
      <Toolbar quillRef={quillRef}/>
      <ReactQuill 
        ref={quillRef}
        theme='snow'
        value={content as any}
        onChange={(_, __, ___, editor) => {
          const full = editor.getContents();
          setContent(full);
        }}
        modules={modules}
        formats={formats}
      />
    </div>
  )
}