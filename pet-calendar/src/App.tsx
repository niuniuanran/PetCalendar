import React from "react";
import "./App.css";
import ImageCard from "./Components/ImageList/ImageList";

function App() {
  return (
    <div className="App">
      <ImageCard query="dog" />
    </div>
  );
}

export default App;
