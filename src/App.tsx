import "./App.css";
import React from "react";
import Navbar from "./components/navbar";
import Sidebar from "./components/sidebar";
import EditorSection from "./components/editor-section";

function App() {
  const handleMarkdownCopy = () => {
    navigator.clipboard.writeText("devmode" || "");
  };

  return (
    <div className="App">
      <Navbar onMarkdownCopy={handleMarkdownCopy} />
      <div className="editor-container">
        <Sidebar />
        <EditorSection />
      </div>
    </div>
  );
}

export default App;
