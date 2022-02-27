import theme from "../../utils/theme";
import imageCompression from "browser-image-compression";
import { useState } from "react";
import Editor from "@nijat13/rich-markdown-editor-with-resizer";

function EditorComponent() {
  const [note, setNote] = useState<string | undefined>("");

  const handleFileUpload = async (file: File) => {
    const compressed_file = await imageCompression(file, {
      maxSizeMB: 0.4,
    });
    const url = await imageCompression.getDataUrlFromFile(compressed_file);
    return url as string;
  };

  return (
    <div className="editor-section">
      <Editor
        defaultValue={note}
        onChange={(getContent) => {
          const content = getContent();
          console.log({ content });
          setNote(content);
        }}
        uploadImage={handleFileUpload}
        theme={theme}
        className="editor"
      />
    </div>
  );
}

export default EditorComponent;
