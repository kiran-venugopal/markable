import "./App.css";
import React from "react";
import Navbar from "./components/navbar";
import Sidebar from "./components/sidebar";
import EditorSection from "./components/editor-section";

function App() {
  return (
    <div className="App">
      <Navbar />
      <div className="editor-container">
        <Sidebar />
        <EditorSection />
      </div>
    </div>
  );
}

export default App;
