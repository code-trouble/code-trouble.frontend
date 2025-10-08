import { DeltaStatic, Quill } from "quill";
import React from "react";

declare type EditorProps = {
  readOnly?: boolean;
  defaultValue?: DeltaStatic; // matches what you pass in TextEditor
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
};

declare const Editor: React.ForwardRefExoticComponent<
  EditorProps & React.RefAttributes<Quill>
>;

export default Editor;
