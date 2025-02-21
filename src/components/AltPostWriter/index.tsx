import React, { useEffect, useRef } from 'react';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';
import codespace from '../../assets/images/svg/codespace.svg';
import toolbarList from '../../assets/images/svg/toolbarList.svg';
import toolbarOrdered from '../../assets/images/svg/toolbarOrderedList.svg';
import toolbarImg from '../../assets/images/svg/toolbarImg.svg';
import toolbarVideo from '../../assets/images/svg/toolbarVideo.svg';
import toolbarLink from '../../assets/images/svg/toolbarLink.svg';

export const AltPostWriter: React.FC = () => {
    const toolbarId = useRef('custom-toolbar-' + Math.random().toString(36).substring(2, 9));
    const quillRef = useRef<HTMLDivElement>(null);
    const editorRef = useRef<Quill | null>(null);

    useEffect(() => {
        if (quillRef.current) {
            editorRef.current = new Quill(quillRef.current, {
                theme: 'snow',
                modules: {
                    toolbar: {
                        container: '#' + toolbarId.current,
                        handlers: {
                            bold: function (this: { quill: Quill }) {
                                const range = this.quill.getSelection();
                                if (range) {
                                    const format = this.quill.getFormat(range);
                                    this.quill.format('bold', !format.bold);
                                }
                            },
                            italic: function (this: { quill: Quill }) {
                                const range = this.quill.getSelection();
                                if (range) {
                                    const format = this.quill.getFormat(range);
                                    this.quill.format('italic', !format.italic);
                                }
                            },
                            underline: function (this: { quill: Quill }) {
                                const range = this.quill.getSelection();
                                if (range) {
                                    const format = this.quill.getFormat(range);
                                    this.quill.format('underline', !format.underline);
                                }
                            },
                            strike: function (this: { quill: Quill }) {
                                const range = this.quill.getSelection();
                                if (range) {
                                    const format = this.quill.getFormat(range);
                                    this.quill.format('strike', !format.strike);
                                }
                            },
                            'code-block': function (this: { quill: Quill }) {
                                const range = this.quill.getSelection();
                                if (range) {
                                    const format = this.quill.getFormat(range);
                                    this.quill.format('code-block', !format['code-block']);
                                }
                            },
                            image: function (this: { quill: Quill }) {
                                const range = this.quill.getSelection();
                                const input = document.createElement('input');
                                input.setAttribute('type', 'file');
                                input.setAttribute('accept', 'image/*');
                                input.click();
                                input.onchange = () => {
                                    const file = input.files ? input.files[0] : null;
                                    if (!file) return;
                                    const reader = new FileReader();
                                    reader.onload = () => {
                                        const rangeToInsert = range || { index: this.quill.getLength(), length: 0 };
                                        this.quill.insertEmbed(rangeToInsert.index, 'image', reader.result);
                                        this.quill.setSelection(rangeToInsert.index + 1);
                                    };
                                    reader.readAsDataURL(file);
                                };
                            }
                        }
                    }
                },
                placeholder: '',
            });

            const updatePlaceholder = () => {
                const editor = quillRef.current?.querySelector('.ql-editor');
                const textLength = editorRef.current?.getText().trim().length;
                if (textLength === 0) {
                    editor?.setAttribute('data-placeholder', 'Escreva seu texto...');
                } else {
                    editor?.removeAttribute('data-placeholder');
                }
            };

            editorRef.current.on('text-change', updatePlaceholder);
            editorRef.current.on('selection-change', (range) => {
                if (range == null) {
                    updatePlaceholder();
                }
            });
            updatePlaceholder();

            setTimeout(() => {
                const toolbarContainer = document.getElementById(toolbarId.current)!;
                const replaceIcon = (selector: string, newIcon: string) => {
                    const button = toolbarContainer.querySelector(selector);
                    if (button) {
                        button.innerHTML = newIcon;
                    }
                };

                replaceIcon('.ql-bold', 'Bold');
                replaceIcon('.ql-italic', 'Italic');
                replaceIcon('.ql-underline', 'Underline');
                replaceIcon('.ql-strike', 'Strike');
                replaceIcon('.ql-list[value="bullet"]', `<img src="${toolbarList}" alt="Bullet List" />`);
                replaceIcon('.ql-list[value="ordered"]', `<img src="${toolbarOrdered}" alt="Ordered List" />`);
                replaceIcon('.ql-code-block', `<img src="${codespace}" alt="Code Block" />`);
                replaceIcon('.ql-link', `<img src="${toolbarLink}" alt="Link" />`);
                replaceIcon('.ql-image', `<img src="${toolbarImg}" alt="Image" />`);
                replaceIcon('.ql-video', `<img src="${toolbarVideo}" alt="Video" />`);
            }, 100);
        }
    }, []);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const editorContent = editorRef.current?.root.innerHTML || '';
        console.log('Conteúdo enviado:', editorContent);
    };

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
            <form onSubmit={handleSubmit} className="editor-form">
                <div className="editor-container">
                    <div ref={quillRef} className="editor-area"></div>
                </div>
            </form>
        </div>
    );
};
