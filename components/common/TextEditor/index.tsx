import { Editor } from "@tinymce/tinymce-react";
import { useEffect, useRef, useState } from "react";
import initFullProps from "./initFullProps";

const CustomEditor = ({ apiKey, onChange }: any) => {
  const editorRef = useRef<any>(null);

  const handleEditorChange = (content: any) => {
    onChange(content);
  };
  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.setContent();
    }
  }, []);

  return (
    <>
      <Editor
        onChange={handleEditorChange}
        apiKey={apiKey}
        onInit={(evt, editor) => {
          editorRef.current = editor;
        }}
        // onInit={(evt, editor) => editorRef?.current === editor}
        initialValue="<p>This is the initial content of the editor.</p>"
        init={initFullProps}
      />
      {/* <button onClick={log}>Log editor content</button> */}
    </>
  );
};

export default CustomEditor;
