import React, {
  forwardRef,
  useEffect,
  useLayoutEffect,
  useRef,
  useCallback,
} from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";

const AEditor = forwardRef(
  (
    {
      readOnly,
      defaultValue,
      onTextChange,
      onSelectionChange,
      toolbarId,
      editorId,
      onFocus,
      onPaste,
    },
    ref,
  ) => {
    const containerRef = useRef(null);
    const quillInstanceRef = useRef(null);
    const defaultValueRef = useRef(defaultValue);
    const onTextChangeRef = useRef(onTextChange);
    const onSelectionChangeRef = useRef(onSelectionChange);
    const onPasteRef = useRef(onPaste);

    const uniqueId = useRef(
      editorId || `editor-${Math.random().toString(36).substr(2, 9)}`,
    );

    useLayoutEffect(() => {
      onTextChangeRef.current = onTextChange;
      onSelectionChangeRef.current = onSelectionChange;
      onPasteRef.current = onPaste;
    }, [onTextChange, onSelectionChange, onPaste]);

    useEffect(() => {
      if (ref.current) {
        ref.current.enable(!readOnly);
      }
    }, [ref, readOnly]);

    const initializeQuill = useCallback(() => {
      const container = containerRef.current;
      if (!container) return;

      const existingEditor = container.querySelector(`#${uniqueId.current}`);
      if (existingEditor) {
        existingEditor.remove();
      }

      const editorContainer = document.createElement("div");
      editorContainer.id = uniqueId.current;
      container.appendChild(editorContainer);

      const quill = new Quill(`#${uniqueId.current}`, {
        theme: "snow",
        modules: {
          toolbar: toolbarId ? `#${toolbarId}` : false,
        },
        placeholder: "Escreva seu texto",
      });

      const clipboardModule = quill.getModule("clipboard");
      if (clipboardModule) {
        clipboardModule.matchers = [];
        clipboardModule.onPaste = function (e) {
          e.preventDefault();
          e.stopPropagation();
          e.stopImmediatePropagation();
          return false;
        };
        clipboardModule.addMatcher = function () {
          return null;
        };
      }

      quillInstanceRef.current = quill;
      ref.current = quill;

      if (defaultValueRef.current) {
        quill.setContents(defaultValueRef.current, "silent");
      }

      quill.on(Quill.events.TEXT_CHANGE, (...args) => {
        onTextChangeRef.current?.(...args);
      });

      quill.on(Quill.events.SELECTION_CHANGE, (...args) => {
        onSelectionChangeRef.current?.(...args);
      });

      const handleFocus = () => {
        onFocus?.(quill);
      };
      quill.root.addEventListener("focus", handleFocus);

      const handlePaste = (e) => {
        onPasteRef.current?.(e, quill);
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
        return false;
      };

      quill.root.addEventListener("paste", handlePaste, true);

      return () => {
        quill.root.removeEventListener("paste", handlePaste, true);
        quill.root.removeEventListener("focus", handleFocus);
        quill.off(Quill.events.TEXT_CHANGE);
        quill.off(Quill.events.SELECTION_CHANGE);
      };
    }, [ref, toolbarId, onFocus]);

    useEffect(() => {
      const cleanup = initializeQuill();

      return () => {
        if (cleanup) cleanup();

        if (quillInstanceRef.current) {
          const quill = quillInstanceRef.current;

          quill.off(Quill.events.TEXT_CHANGE);
          quill.off(Quill.events.SELECTION_CHANGE);

          const container = containerRef.current;
          if (container) {
            const quillElements = container.querySelectorAll(
              ".ql-container, .ql-toolbar",
            );
            quillElements.forEach((element) => {
              if (element.parentNode === container) {
                container.removeChild(element);
              }
            });
          }

          quillInstanceRef.current = null;
          ref.current = null;
        }
      };
    }, [initializeQuill, ref]);

    return (
      <div
        style={{ height: "100%", position: "relative" }}
        ref={containerRef}
      />
    );
  },
);

AEditor.displayName = "AEditor";

export default AEditor;
