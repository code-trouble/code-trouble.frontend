import React, { useEffect, useMemo, useRef, useState } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import codespace from "../../assets/images/svg/codespace.svg";
import toolbarList from "../../assets/images/svg/toolbarList.svg";
import toolbarOrdered from "../../assets/images/svg/toolbarOrderedList.svg";
import toolbarImg from "../../assets/images/svg/toolbarImg.svg";
import toolbarVideo from "../../assets/images/svg/toolbarVideo.svg";
import toolbarLink from "../../assets/images/svg/toolbarLink.svg";
import { TagList } from "../Tag";
import { TooltipDescription } from "./TooltipDescription";
import { useTagStore } from "../../stores/tagStore";

interface IPostWriter {
  value: any; // Delta object
  onChange: (delta: any) => void;
  title: string;
  onTitleChange: (title: string) => void;
  tags: string[];
  onTagsChange: (tags: string[]) => void;
}

export const PostWriter: React.FC<IPostWriter> = ({
  value,
  onChange,
  title,
  onTitleChange,
  tags,
  onTagsChange,
}) => {
  const toolbarId = useRef(
    "custom-toolbar-" + Math.random().toString(36).substring(2, 9),
  );

  useEffect(() => {
    const updateToolbarPosition = () => {
      if (window.innerWidth <= 1000 && window.visualViewport) {
        const keyboardHeight =
          window.innerHeight - window.visualViewport.height;
        if (keyboardHeight > 0) {
          const adjustedBottom =
            keyboardHeight - window.visualViewport.offsetTop;
          document.documentElement.style.setProperty(
            "--toolbar-bottom",
            `${adjustedBottom}px`,
          );
        } else {
          document.documentElement.style.setProperty("--toolbar-bottom", "0px");
        }
      } else {
        document.documentElement.style.setProperty("--toolbar-bottom", "0px");
      }
    };
    const onViewportChange = () => updateToolbarPosition();
    window.visualViewport?.addEventListener("resize", onViewportChange);
    window.visualViewport?.addEventListener("scroll", onViewportChange);
    updateToolbarPosition();
    return () => {
      window.visualViewport?.removeEventListener("resize", onViewportChange);
      window.visualViewport?.removeEventListener("scroll", onViewportChange);
    };
  }, []);

  const quillRef = useRef<HTMLDivElement>(null);
  const editorRef = useRef<Quill | null>(null);

  const tagsFromStore = useTagStore((state) => state.tags);

  const allTags = useMemo(
    () => tagsFromStore.map((tag) => tag.name),
    [tagsFromStore],
  );

  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    if (!editorRef.current && quillRef.current) {
      editorRef.current = new Quill(quillRef.current, {
        theme: "snow",
        modules: {
          toolbar: {
            container: "#" + toolbarId.current,
            handlers: {
              bold: function (this: { quill: Quill }) {
                const range = this.quill.getSelection();
                if (range) {
                  const format = this.quill.getFormat(range);
                  this.quill.format("bold", !format.bold);
                }
              },
              italic: function (this: { quill: Quill }) {
                const range = this.quill.getSelection();
                if (range) {
                  const format = this.quill.getFormat(range);
                  this.quill.format("italic", !format.italic);
                }
              },
              underline: function (this: { quill: Quill }) {
                const range = this.quill.getSelection();
                if (range) {
                  const format = this.quill.getFormat(range);
                  this.quill.format("underline", !format.underline);
                }
              },
              strike: function (this: { quill: Quill }) {
                const range = this.quill.getSelection();
                if (range) {
                  const format = this.quill.getFormat(range);
                  this.quill.format("strike", !format.strike);
                }
              },
              "code-block": function (this: { quill: Quill }) {
                const range = this.quill.getSelection();
                if (range) {
                  const format = this.quill.getFormat(range);
                  this.quill.format("code-block", !format["code-block"]);
                }
              },
              image: function (this: { quill: Quill }) {
                const range = this.quill.getSelection();
                const input = document.createElement("input");
                input.setAttribute("type", "file");
                input.setAttribute("accept", "image/*");
                input.style.display = "none";
                document.body.appendChild(input);

                input.addEventListener("change", () => {
                  const file = input.files?.[0];
                  if (!file) return;

                  const reader = new FileReader();
                  reader.onload = () => {
                    this.quill.focus();
                    const rangeToInsert = range || {
                      index: this.quill.getLength(),
                      length: 0,
                    };
                    this.quill.insertEmbed(
                      rangeToInsert.index,
                      "image",
                      reader.result,
                      "user",
                    );
                    this.quill.setSelection(rangeToInsert.index + 1, 0, "user");
                  };
                  reader.readAsDataURL(file);
                  document.body.removeChild(input);
                });

                input.click();
              },
            },
          },
        },
        placeholder: "",
      });

      // Load initial content from Delta
      if (value && value.ops) {
        editorRef.current.setContents(value);
      }

      const updatePlaceholder = () => {
        const editor = quillRef.current?.querySelector(".ql-editor");
        const textLength = editorRef.current?.getText().trim().length;
        if (textLength === 0) {
          editor?.setAttribute("data-placeholder", "Escreva seu texto...");
        } else {
          editor?.removeAttribute("data-placeholder");
        }
      };

      editorRef.current.on("text-change", () => {
        updatePlaceholder();
        const delta = editorRef.current!.getContents();
        onChange(delta);
      });

      editorRef.current.on("selection-change", (range) => {
        if (range == null) {
          updatePlaceholder();
        }
      });
      updatePlaceholder();

      // Customize toolbar icons - BLACK MAGIC STAYS INTACT!
      setTimeout(() => {
        const toolbarContainer = document.getElementById(toolbarId.current)!;
        const replaceIcon = (selector: string, newIcon: string) => {
          const button = toolbarContainer.querySelector(selector);
          if (button) {
            button.innerHTML = newIcon;
          }
        };

        replaceIcon(".ql-bold", "Bold");
        replaceIcon(".ql-italic", "Italic");
        replaceIcon(".ql-underline", "Underline");
        replaceIcon(".ql-strike", "Strike");
        replaceIcon(
          '.ql-list[value="bullet"]',
          `<img src="${toolbarList}" alt="Bullet List tool" />`,
        );
        replaceIcon(
          '.ql-list[value="ordered"]',
          `<img src="${toolbarOrdered}" alt="Ordered List tool" />`,
        );
        replaceIcon(
          ".ql-code-block",
          `<img src="${codespace}" alt="Code Block tool" />`,
        );
        replaceIcon(".ql-link", `<img src="${toolbarLink}" alt="Link tool" />`);
        replaceIcon(
          ".ql-image",
          `<img src="${toolbarImg}" alt="Image tool" />`,
        );
        replaceIcon(
          ".ql-video",
          `<img src="${toolbarVideo}" alt="Video tool" />`,
        );
      }, 100);
    }
  }, [value, onChange]);

  const handleAddTag = (tag: string) => {
    if (!tags.includes(tag)) {
      onTagsChange([tag, ...tags]);
    }
    setDropdownOpen(false);
  };

  const handleRemoveTag = (tag: string) => {
    onTagsChange(tags.filter((t) => t !== tag));
  };

  const toggleDropdown = () => setDropdownOpen((prev) => !prev);

  useEffect(() => {
    const adjustDropdownPosition = () => {
      const dropdown = document.querySelector(
        ".tags-dropdown",
      ) as HTMLElement | null;
      if (!dropdown) return;
      const dropdownRect = dropdown.getBoundingClientRect();
      const viewportWidth = window.innerWidth;
      dropdown.style.left = "";
      dropdown.style.right = "";
      if (dropdownRect.left < 0) {
        dropdown.style.left = "0";
        dropdown.style.right = "auto";
      }
      if (dropdownRect.right > viewportWidth) {
        dropdown.style.right = "0";
        dropdown.style.left = "auto";
      }
    };
    if (dropdownOpen) {
      adjustDropdownPosition();
      window.addEventListener("resize", adjustDropdownPosition);
    } else {
      window.removeEventListener("resize", adjustDropdownPosition);
    }
    return () => {
      window.removeEventListener("resize", adjustDropdownPosition);
    };
  }, [dropdownOpen]);

  // MORE BLACK MAGIC - STAYS INTACT!
  useEffect(() => {
    const btn = document.querySelector(
      `#${toolbarId.current} .ql-image`,
    ) as HTMLElement | null;
    if (!btn) return;

    const onCaptureClick = (e: MouseEvent) => {
      e.preventDefault();
      const input = document.createElement("input");
      input.type = "file";
      input.accept = "image/*";
      input.style.display = "none";
      document.body.appendChild(input);

      input.addEventListener("change", () => {
        const file = input.files?.[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = () => {
          const quill = editorRef.current!;
          const range = quill.getSelection(true) || {
            index: quill.getLength(),
            length: 0,
          };
          quill.focus();
          quill.insertEmbed(range.index, "image", reader.result, "user");
          quill.setSelection(range.index + 1, 0, "user");
        };
        reader.readAsDataURL(file);
        document.body.removeChild(input);
      });

      input.click();
    };

    btn.addEventListener("click", onCaptureClick, { capture: true });
    return () =>
      btn.removeEventListener("click", onCaptureClick, { capture: true });
  }, []);

  return (
    <div className="postWriter-container">
      <div id={toolbarId.current} className="custom-toolbar">
        <span className="ql-formats">
          {window.innerWidth > 1200 ? (
            <TooltipDescription text="Negrito">
              <button className="ql-bold"></button>
            </TooltipDescription>
          ) : (
            <button className="ql-bold"></button>
          )}
          {window.innerWidth > 1200 ? (
            <TooltipDescription text="Itálico">
              <button className="ql-italic"></button>
            </TooltipDescription>
          ) : (
            <button className="ql-italic"></button>
          )}
          {window.innerWidth > 1200 ? (
            <TooltipDescription text="Sublinhado">
              <button className="ql-underline"></button>
            </TooltipDescription>
          ) : (
            <button className="ql-underline"></button>
          )}
          {window.innerWidth > 1200 ? (
            <TooltipDescription text="Traçado">
              <button className="ql-strike"></button>
            </TooltipDescription>
          ) : (
            <button className="ql-strike"></button>
          )}
        </span>
        <span className="separator"></span>
        <span className="ql-formats">
          {window.innerWidth > 1200 ? (
            <TooltipDescription text="Adicionar código">
              <button className="ql-code-block"></button>
            </TooltipDescription>
          ) : (
            <button className="ql-code-block"></button>
          )}
          {window.innerWidth > 1200 ? (
            <TooltipDescription text="Adicionar lista">
              <button className="ql-list" value="bullet"></button>
            </TooltipDescription>
          ) : (
            <button className="ql-list" value="bullet"></button>
          )}
          {window.innerWidth > 1200 ? (
            <TooltipDescription text="Adicionar lista numérica">
              <button className="ql-list" value="ordered"></button>
            </TooltipDescription>
          ) : (
            <button className="ql-list" value="ordered"></button>
          )}
        </span>
        <span className="separator"></span>
        <span className="ql-formats last-ql-format">
          {window.innerWidth > 1200 ? (
            <TooltipDescription text="Adicionar imagem">
              <button className="ql-image"></button>
            </TooltipDescription>
          ) : (
            <button className="ql-image"></button>
          )}
          {window.innerWidth > 1200 ? (
            <TooltipDescription text="Adicionar vídeo">
              <button className="ql-video"></button>
            </TooltipDescription>
          ) : (
            <button className="ql-video"></button>
          )}
          {window.innerWidth > 1200 ? (
            <TooltipDescription text="Adicionar link">
              <button className="ql-link"></button>
            </TooltipDescription>
          ) : (
            <button className="ql-link"></button>
          )}
        </span>
      </div>

      <div className="editor-form">
        <div className="editor-container">
          <textarea
            placeholder="Título"
            className="editor-title"
            value={title}
            onChange={(e) => onTitleChange(e.target.value)}
            onInput={(e) => {
              e.currentTarget.style.height = "auto";
              e.currentTarget.style.height = `${e.currentTarget.scrollHeight}px`;
            }}
          />
          <div className="editor-tags">
            {tags.length > 0 && (
              <div className="tags-container">
                <TagList tags={tags} onTagRemove={handleRemoveTag} />
              </div>
            )}
            <div className="tags-button-wrapper">
              <button
                className="tags-button"
                onClick={(e) => {
                  e.preventDefault();
                  toggleDropdown();
                }}
              >
                {tags.length === 0 ? "Adicione tags +" : "+"}
              </button>
              {dropdownOpen && (
                <div className="tags-dropdown">
                  {allTags.filter((tag) => !tags.includes(tag)).length === 0 ? (
                    <span>There are no tags left.</span>
                  ) : (
                    allTags
                      .filter((tag) => !tags.includes(tag))
                      .map((tag, index) => (
                        <button
                          key={index}
                          className="dropdown-tag-item"
                          onClick={() => handleAddTag(tag)}
                        >
                          {tag}
                        </button>
                      ))
                  )}
                </div>
              )}
            </div>
          </div>
          <div ref={quillRef} className="editor-area"></div>
        </div>
      </div>
    </div>
  );
};
