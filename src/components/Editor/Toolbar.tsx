import { useEffect, useRef, useState } from "react";
import ReactQuill from "react-quill";
import type QuillType from "quill";
import { TooltipDescription } from "./TooltipDescription";

type Props = {
  quillRef: React.RefObject<ReactQuill | null>;
};

type FormatState = {
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  strike?: boolean;
  list?: "ordered" | "bullet" | null;
  codeBlock?: boolean;
  link?: string | null;
};

export function Toolbar({ quillRef }: Props) {
  const [fmt, setFmt] = useState<FormatState>({});
  const imgInputRef = useRef<HTMLInputElement | null>(null);
  const vidInputRef = useRef<HTMLInputElement | null>(null);

  const getQuill = () => quillRef.current?.getEditor() as QuillType | null;

  // reflect active states (so your SCSS can style .is-active)
  useEffect(() => {
    const q = getQuill();
    if (!q) return;
    const update = () => {
      const f = q.getFormat() as any;
      setFmt({
        bold: !!f.bold,
        italic: !!f.italic,
        underline: !!f.underline,
        strike: !!f.strike,
        list: (f.list as "ordered" | "bullet") ?? null,
        codeBlock: !!f["code-block"],
        link: (f.link as string) ?? null,
      });
    };
    q.on("selection-change", update);
    q.on("text-change", update);
    update();
    return () => {
      q.off("selection-change", update);
      q.off("text-change", update);
    };
  }, []);

  // inline toggles
  const toggleInline = (attr: "bold" | "italic" | "underline" | "strike") => {
    const q = getQuill();
    if (!q) return;
    const active = !!q.getFormat()[attr];
    q.format(attr, !active, "user");
  };

  // block/list
  const toggleCodeBlock = () => {
    const q = getQuill();
    if (!q) return;
    const active = !!q.getFormat()["code-block"];
    q.format("code-block", !active, "user");
  };

  const setList = (kind: "ordered" | "bullet") => {
    const q = getQuill();
    if (!q) return;
    const current = q.getFormat().list as "ordered" | "bullet" | undefined;
    q.format("list", current === kind ? false : kind, "user");
  };

  // link (URL prompt)
  const setLink = () => {
    const q = getQuill();
    if (!q) return;
    const current = (q.getFormat().link as string) ?? "";
    const url = window.prompt("Adicionar link:", current) ?? "";
    q.format("link", url || false, "user");
  };

  // file pickers
  const pickImage = () => imgInputRef.current?.click();
  const pickVideo = () => vidInputRef.current?.click();

  // read file -> dataURL (base64) -> insert embed
  const handleImageChosen = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const q = getQuill();
    if (!q) return;
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;

    const dataUrl = await fileToDataURL(file);
    const index = q.getSelection()?.index ?? q.getLength();
    q.insertEmbed(index, "image", dataUrl, "user"); // <-- data URL goes into Delta
    q.setSelection(index + 1, 0, "user");
  };

  // note: videos can be huge; consider upload-first for production
  const handleVideoChosen = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const q = getQuill();
    if (!q) return;
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;

    const dataUrl = await fileToDataURL(file);
    const index = q.getSelection()?.index ?? q.getLength();
    q.insertEmbed(index, "video", dataUrl, "user"); // data URL in Delta
    q.setSelection(index + 1, 0, "user");
  };

  return (
    <div className="custom-toolbar">
      {/* hidden pickers */}
      <input
        ref={imgInputRef}
        type="file"
        accept="image/*"
        style={{ display: "none" }}
        onChange={handleImageChosen}
      />
      <input
        ref={vidInputRef}
        type="file"
        accept="video/*"
        style={{ display: "none" }}
        onChange={handleVideoChosen}
      />

      {/* inline */}
      <TooltipDescription text="Negrito">
        <button
          type="button"
          className={`btn btn-bold ${fmt.bold ? "is-active" : ""}`}
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => toggleInline("bold")}
          aria-pressed={fmt.bold ? "true" : "false"}
        >
          Bold
        </button>
      </TooltipDescription>

      <TooltipDescription text="Itálico">
        <button
          type="button"
          className={`btn btn-italic ${fmt.italic ? "is-active" : ""}`}
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => toggleInline("italic")}
          aria-pressed={fmt.italic ? "true" : "false"}
        >
          Italic
        </button>
      </TooltipDescription>

      <TooltipDescription text="Sublinhado">
        <button
          type="button"
          className={`btn btn-underline ${fmt.underline ? "is-active" : ""}`}
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => toggleInline("underline")}
          aria-pressed={fmt.underline ? "true" : "false"}
        >
          Underline
        </button>
      </TooltipDescription>

      <TooltipDescription text="Traçado">
        <button
          type="button"
          className={`btn btn-strike ${fmt.strike ? "is-active" : ""}`}
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => toggleInline("strike")}
          aria-pressed={fmt.strike ? "true" : "false"}
        >
          Strike
        </button>
      </TooltipDescription>

      <span className="sep" />

      {/* block/list */}
      <TooltipDescription text="Código">
        <button
          type="button"
          className={`btn btn-code ${fmt.codeBlock ? "is-active" : ""}`}
          onMouseDown={(e) => e.preventDefault()}
          onClick={toggleCodeBlock}
          aria-pressed={fmt.codeBlock ? "true" : "false"}
        >
          {"</>"}
        </button>
      </TooltipDescription>

      <TooltipDescription text="Lista com marcadores">
        <button
          type="button"
          className={`btn btn-list-bullet ${fmt.list === "bullet" ? "is-active" : ""}`}
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => setList("bullet")}
          aria-pressed={fmt.list === "bullet" ? "true" : "false"}
        >
          •
        </button>
      </TooltipDescription>

      <TooltipDescription text="Lista numerada">
        <button
          type="button"
          className={`btn btn-list-ordered ${fmt.list === "ordered" ? "is-active" : ""}`}
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => setList("ordered")}
          aria-pressed={fmt.list === "ordered" ? "true" : "false"}
        >
          1.
        </button>
      </TooltipDescription>

      <span className="sep" />

      {/* media + link */}
      <TooltipDescription text="Adicionar imagem">
        <button
          type="button"
          className="btn btn-image"
          onMouseDown={(e) => e.preventDefault()}
          onClick={pickImage}
        >
          🖼
        </button>
      </TooltipDescription>

      <TooltipDescription text="Adicionar vídeo">
        <button
          type="button"
          className="btn btn-video"
          onMouseDown={(e) => e.preventDefault()}
          onClick={pickVideo}
        >
          ▶
        </button>
      </TooltipDescription>

      <TooltipDescription text="Adicionar link">
        <button
          type="button"
          className={`btn btn-link ${fmt.link ? "is-active" : ""}`}
          onMouseDown={(e) => e.preventDefault()}
          onClick={setLink}
          aria-pressed={fmt.link ? "true" : "false"}
        >
          🔗
        </button>
      </TooltipDescription>
    </div>
  );
}

// util
function fileToDataURL(file: File): Promise<string> {
  return new Promise((res, rej) => {
    const reader = new FileReader();
    reader.onload = () => res(reader.result as string);
    reader.onerror = rej;
    reader.readAsDataURL(file);
  });
}
