import React, { useEffect, useRef } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import codespace from "../../assets/images/svg/codespace.svg";
import toolbarList from "../../assets/images/svg/toolbarList.svg";
import toolbarOrdered from "../../assets/images/svg/toolbarOrderedList.svg";
import toolbarImg from "../../assets/images/svg/toolbarImg.svg";
import toolbarVideo from "../../assets/images/svg/toolbarVideo.svg";
import toolbarLink from "../../assets/images/svg/toolbarLink.svg";

interface IAltPostWriter {
    value: string;
    onChange: (html: string) => void;
}

export const AltPostWriter: React.FC<IAltPostWriter> = ({ value, onChange }) => {
    const toolbarId = useRef("custom-toolbar-" + Math.random().toString(36).substring(2, 9));
    const quillRef  = useRef<HTMLDivElement>(null);
    const editorRef = useRef<Quill | null>(null);

    useEffect(() => {
        if (!editorRef.current && quillRef.current) {
            editorRef.current = new Quill(quillRef.current, {
                theme: "snow",
                modules: {
                    toolbar: {
                        container: "#" + toolbarId.current,
                        handlers: {
                            bold: function (this: any) {
                                const range = this.quill.getSelection();
                                if (range) {
                                    const format = this.quill.getFormat(range);
                                    this.quill.format("bold", !format.bold);
                                }
                            },
                            italic: function (this: any) {
                                const range = this.quill.getSelection();
                                if (range) {
                                    const format = this.quill.getFormat(range);
                                    this.quill.format("italic", !format.italic);
                                }
                            },
                            underline: function (this: any) {
                                const range = this.quill.getSelection();
                                if (range) {
                                    const format = this.quill.getFormat(range);
                                    this.quill.format("underline", !format.underline);
                                }
                            },
                            strike: function (this: any) {
                                const range = this.quill.getSelection();
                                if (range) {
                                    const format = this.quill.getFormat(range);
                                    this.quill.format("strike", !format.strike);
                                }
                            },
                            "code-block": function (this: any) {
                                const range = this.quill.getSelection();
                                if (range) {
                                    const format = this.quill.getFormat(range);
                                    this.quill.format("code-block", !format["code-block"]);
                                }
                            },
                            image: function (this: any) {
                                const range = this.quill.getSelection();
                                const input = document.createElement("input");
                                input.setAttribute("type", "file");
                                input.setAttribute("accept", "image/*");
                                input.click();
                                input.onchange = () => {
                                    const file = input.files ? input.files[0] : null;
                                    if (!file) return;
                                    const reader = new FileReader();
                                    reader.onload = () => {
                                        const idx = range?.index ?? this.quill.getLength();
                                        this.quill.insertEmbed(idx, "image", reader.result);
                                        this.quill.setSelection(idx + 1);
                                    };
                                    reader.readAsDataURL(file);
                                };
                            }
                        }
                    }
                },
                placeholder: ""
            });

            // load initial content
            editorRef.current.root.innerHTML = value;

            const updatePlaceholder = () => {
                const editor = quillRef.current?.querySelector(".ql-editor");
                const textLength = editorRef.current?.getText().trim().length ?? 0;
                if (textLength === 0) {
                    editor?.setAttribute("data-placeholder", "Escreva seu texto...");
                } else {
                    editor?.removeAttribute("data-placeholder");
                }
            };

            editorRef.current.on("text-change", () => {
                updatePlaceholder();
                onChange(editorRef.current!.root.innerHTML);
            });
            editorRef.current.on("selection-change", range => {
                if (range == null) updatePlaceholder();
            });
            updatePlaceholder();

            setTimeout(() => {
                const toolbar = document.getElementById(toolbarId.current)!;
                const replace = (sel: string, icon: string) => {
                    const btn = toolbar.querySelector(sel);
                    if (btn) btn.innerHTML = icon;
                };
                replace(".ql-bold", "Bold");
                replace(".ql-italic", "Italic");
                replace(".ql-underline", "Underline");
                replace(".ql-strike", "Strike");
                replace('.ql-list[value="bullet"]', `<img src="${toolbarList}" alt="Bullet"/>`);
                replace('.ql-list[value="ordered"]', `<img src="${toolbarOrdered}" alt="Ordered"/>`);
                replace(".ql-code-block", `<img src="${codespace}" alt="Code"/>`);
                replace(".ql-link", `<img src="${toolbarLink}" alt="Link"/>`);
                replace(".ql-image", `<img src="${toolbarImg}" alt="Image"/>`);
                replace(".ql-video", `<img src="${toolbarVideo}" alt="Video"/>`);
            }, 100);
        }
    }, [value, onChange]);

    return (
        <div className="postWriter-container alt">
            <div id={toolbarId.current} className="custom-toolbar">
                <span className="ql-formats">
                    <button className="ql-bold"></button>
                    <button className="ql-italic"></button>
                    <button className="ql-underline"></button>
                    <button className="ql-strike"></button>
                </span>
                <span className="separator"></span>
                <span className="ql-formats">
                    <button className="ql-code-block"></button>
                    <button className="ql-list" value="bullet"></button>
                    <button className="ql-list" value="ordered"></button>
                </span>
                <span className="separator"></span>
                <span className="ql-formats last-ql-format">
                    <button className="ql-image"></button>
                    <button className="ql-video"></button>
                    <button className="ql-link"></button>
                </span>
            </div>
            <div className="editor-container">
                <div ref={quillRef} className="editor-area"></div>
            </div>
        </div>
    );
};
