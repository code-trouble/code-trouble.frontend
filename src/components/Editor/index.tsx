import React, { useRef, useEffect } from "react";
import Editor from "./editor";
import Quill from "quill";

interface ITextEditor {
  value: any;
  onChange: (delta: any) => void;
  isEditMode?: boolean;
}

export const TextEditor: React.FC<ITextEditor> = ({
  value,
  onChange,
  isEditMode = false,
}) => {
  const quillRef = useRef<Quill | null>(null);

  //delta: any, oldDelta: any,
  const handleTextChange = (source: string) => {
    if (source === "user" && quillRef.current) {
      const currentContents = quillRef.current.getContents();
      onChange(currentContents);
    }
  };

  useEffect(() => {
    if (quillRef.current && value) {
      const editorContent = quillRef.current.getContents();

      if (JSON.stringify(editorContent) !== JSON.stringify(value)) {
        quillRef.current.setContents(value, "silent");
      }
    } else if (quillRef.current && !value) {
      const currentContent = quillRef.current.getContents();
      if (
        currentContent.ops &&
        currentContent.ops.length > 0 &&
        !(
          currentContent.ops.length === 1 &&
          currentContent.ops[0].insert === "\n"
        )
      ) {
        quillRef.current.setText("", "silent");
      }
    }
  }, [value]);

  return (
    <div style={{ height: "80%" }}>
      <Editor
        ref={quillRef}
        readOnly={isEditMode === false}
        defaultValue={value}
        onTextChange={handleTextChange}
        onSelectionChange={() => {}}
      />
    </div>
  );
};
