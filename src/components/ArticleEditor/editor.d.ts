import { DeltaStatic, Quill } from "quill";
import React from "react";

declare type EditorProps = {
  readOnly?: boolean;
  defaultValue?: DeltaStatic;
  onTextChange?: (
    delta: DeltaStatic,
    oldDelta: DeltaStatic,
    source: string,
  ) => void;
  onSelectionChange?: (
    range: Quill.RangeStatic | null,
    oldRange: Quill.RangeStatic | null,
    source: string,
  ) => void;
  toolbarId?: string;
  editorId?: string;
  onFocus?: (editor: Quill) => void;
  onPaste?: (event: Event, editor: Quill) => void;
};

declare const AEditor: React.ForwardRefExoticComponent<
  EditorProps & React.RefAttributes<Quill>
>;

export default AEditor;
