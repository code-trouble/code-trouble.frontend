import React, { forwardRef, useEffect, useLayoutEffect, useRef } from "react";
import Quill from "quill"; // ✅ import Quill
import "quill/dist/quill.snow.css";
// Editor is an uncontrolled React component
const Editor = forwardRef(
  ({ readOnly, defaultValue, onTextChange, onSelectionChange }, ref) => {
    const containerRef = useRef(null);
    const defaultValueRef = useRef(defaultValue);
    const onTextChangeRef = useRef(onTextChange);
    const onSelectionChangeRef = useRef(onSelectionChange);

    useLayoutEffect(() => {
      onTextChangeRef.current = onTextChange;
      onSelectionChangeRef.current = onSelectionChange;
    });

    useEffect(() => {
      ref.current?.enable(!readOnly);
    }, [ref, readOnly]);

    useEffect(() => {
      const container = containerRef.current;
      const editorContainer = container.appendChild(
        container.ownerDocument.createElement("div"),
      );
      const quill = new Quill(editorContainer, {
        theme: "snow",
        modules: {
          toolbar: [
            // Group 1: Basic text formatting
            ["bold", "italic", "underline", "strike"],

            // Group 2: Blocks and lists
            ["code-block", { list: "bullet" }, { list: "ordered" }],

            // Group 3: Embeds
            ["image", "video", "link"],
          ],
        },
        placeholder: "Escreva seu texto",
      });

      ref.current = quill;

      if (defaultValueRef.current) {
        quill.setContents(defaultValueRef.current);
      }

      quill.on(Quill.events.TEXT_CHANGE, (...args) => {
        onTextChangeRef.current?.(...args);
      });

      quill.on(Quill.events.SELECTION_CHANGE, (...args) => {
        onSelectionChangeRef.current?.(...args);
      });

      return () => {
        ref.current = null;
        container.innerHTML = "";
      };
    }, [ref]);

    return <div style={{ height: "100%" }} ref={containerRef}></div>;
  },
);

Editor.displayName = "Editor";

export default Editor;
