import "./App.css";
import { useRecoilState } from "recoil";
import { userState } from "./recoil/atoms";
import { useState } from "react";
import Editor from "./components/rich-markdown-editor";
import imageCompression from "browser-image-compression";
import theme from "./utils/theme";
import Navbar from "./components/navbar";
import Sidebar from "./components/sidebar";

function App() {
  const [user] = useRecoilState(userState);
  const [note, setNote] = useState<string | undefined>("");

  const handleFileUpload = async (file: File) => {
    const compressed_file = await imageCompression(file, {
      maxSizeMB: 0.4,
    });
    const url = await imageCompression.getDataUrlFromFile(compressed_file);
    return url as string;
  };

  const handleMarkdownCopy = () => {
    navigator.clipboard.writeText(note || "");
  };

  return (
    <div className="App">
      <Navbar onMarkdownCopy={handleMarkdownCopy} />
      <div className="editor-container">
        <Sidebar />
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
      </div>
    </div>
  );
}

export default App;
