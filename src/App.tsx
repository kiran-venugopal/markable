import "./App.css";
import React from "react";
import Navbar from "./components/navbar";
import Sidebar from "./components/sidebar";
import EditorSection from "./components/editor-section";
import { RecoilRoot } from "recoil";

function App() {
  return (
    <RecoilRoot>
      <div className="App">
        <Navbar />
        <div className="editor-container">
          <Sidebar />
          <EditorSection />
        </div>
      </div>
    </RecoilRoot>
  );
}

export default App;
