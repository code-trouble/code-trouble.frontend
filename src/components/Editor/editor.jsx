import React, {
  forwardRef,
  useEffect,
  useLayoutEffect,
  useRef,
  useCallback,
  useState,
} from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import { useImageUpload } from "../../hooks/useImageUpload";
import { ClipLoader } from "react-spinners";

const Editor = forwardRef(
  (
    {
      readOnly,
      defaultValue,
      onTextChange,
      onSelectionChange,
      toolbarId,
      editorId,
      onFocus,
    },
    ref,
  ) => {
    const containerRef = useRef(null);
    const quillInstanceRef = useRef(null);
    const defaultValueRef = useRef(defaultValue);
    const onTextChangeRef = useRef(onTextChange);
    const onSelectionChangeRef = useRef(onSelectionChange);
    const { uploadFile } = useImageUpload();
    const uploadFileRef = useRef(uploadFile);
    const [uploading, setUploading] = useState(false);

    const uniqueId = useRef(
      editorId || `editor-${Math.random().toString(36).substr(2, 9)}`,
    );

    useLayoutEffect(() => {
      onTextChangeRef.current = onTextChange;
      onSelectionChangeRef.current = onSelectionChange;
      uploadFileRef.current = uploadFile;
    }, [onTextChange, onSelectionChange, uploadFile]);

    useEffect(() => {
      if (ref.current) {
        ref.current.enable(!readOnly);
      }
    }, [ref, readOnly]);

    const initializeQuill = useCallback(() => {
      const container = containerRef.current;
      if (!container) return;

      container.innerHTML = "";

      const editorContainer = document.createElement("div");
      editorContainer.id = uniqueId.current;
      container.appendChild(editorContainer);

      const quill = new Quill(`#${uniqueId.current}`, {
        theme: "snow",
        modules: {
          toolbar: toolbarId
            ? `#${toolbarId}`
            : [
                ["bold", "italic", "underline", "strike"],
                ["code-block", { list: "bullet" }, { list: "ordered" }],
                ["image", "video", "link"],
              ],
          clipboard: toolbarId
            ? {
                matchVisual: false,
              }
            : undefined,
        },
        placeholder: "Escreva seu texto",
      });

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

      const toolbar = quill.getModule("toolbar");

      toolbar.addHandler("image", () => {
        const input = document.createElement("input");
        input.type = "file";
        input.accept = "image/*";
        input.click();
        input.onchange = () => {
          const file = input.files?.[0];
          if (!file) return;

          setTimeout(async () => {
            quill.focus();

            let range = quill.getSelection(true);
            if (!range) {
              const length = quill.getLength();
              quill.setSelection(length, 0, "silent");
              range = quill.getSelection(true);
            }

            if (!range) {
              console.error("Failed to get valid selection range");
              return;
            }

            setUploading(true);
            try {
              const url = await uploadFileRef.current(file, "tmp-post-images");
              quill.insertEmbed(range.index, "image", url, "user");
              quill.setSelection(range.index + 1, 0, "user");
            } catch (error) {
              console.error("Image upload failed:", error);
            } finally {
              setUploading(false);
            }
          }, 100);
        };
      });

      // Paste handler
      const handlePaste = async (e) => {
        const items = e.clipboardData?.items;
        if (!items) return;
        for (const item of items) {
          if (item.type.startsWith("image/")) {
            e.preventDefault();
            e.stopImmediatePropagation();

            const file = item.getAsFile();
            if (!file) return;

            quill.focus();

            let range = quill.getSelection(true);
            if (!range) {
              const length = quill.getLength();
              quill.setSelection(length, 0, "silent");
              range = quill.getSelection(true);
            }

            if (!range) {
              console.error("Failed to get valid selection range on paste");
              return;
            }

            setUploading(true);
            try {
              const url = await uploadFileRef.current(file, "tmp-post-images");
              quill.insertEmbed(range.index, "image", url, "user");
              quill.setSelection(range.index + 1, 0, "user");
            } catch (error) {
              console.error("Image upload failed on paste:", error);
            } finally {
              setUploading(false);
            }
            return;
          }
        }
      };

      quill.root.addEventListener("paste", handlePaste);

      return () => {
        quill.root.removeEventListener("paste", handlePaste);
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

          if (document.getSelection) {
            document.getSelection().removeAllRanges();
          }

          quillInstanceRef.current = null;
          ref.current = null;
        }
      };
    }, [initializeQuill, ref]);

    return (
      <div style={{ height: "100%", position: "relative" }} ref={containerRef}>
        {uploading && (
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "rgba(255,255,255,0.6)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              zIndex: 10,
            }}
          >
            <ClipLoader size={50} color="#36d7b7" />
          </div>
        )}
      </div>
    );
  },
);

Editor.displayName = "Editor";

export default Editor;
