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
        <iframe
          width="1280"
          height="720"
          src="https://www.youtube.com/embed/ldyqHK0tbSc"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
        <div className="editor-container">
          <Sidebar />
          <EditorSection />
        </div>
      </div>
    </RecoilRoot>
  );
}

export default App;
