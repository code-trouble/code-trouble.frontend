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

  // Fixed: Properly handle text change with all parameters
  const handleTextChange = (delta: any, oldDelta: any, source: string) => {
    if (source === "user" && quillRef.current) {
      const currentContents = quillRef.current.getContents();
      console.log("TextEditor - Current contents:", currentContents); // Debug log
      onChange(currentContents);
    }
  };

  // Sync the editor content when value changes externally
  useEffect(() => {
    if (quillRef.current && value) {
      const editorContent = quillRef.current.getContents();

      // Only update if the content is actually different
      if (JSON.stringify(editorContent) !== JSON.stringify(value)) {
        console.log("TextEditor - Setting content from prop:", value); // Debug log
        quillRef.current.setContents(value, "silent");
      }
    } else if (quillRef.current && !value) {
      // If value is empty, clear the editor but only if it's not already empty
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
        readOnly={isEditMode === false} // Fixed: use isEditMode properly
        defaultValue={value}
        onTextChange={handleTextChange}
        onSelectionChange={() => {}}
      />
    </div>
  );
};
