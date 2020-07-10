import React from "react";
import "./App.css";
import ImageCard from "./Components/ImageList/ImageList";
import Calendar from "./Components/Calendar/Calendar";

function App() {
  return (
    <div className="App">
      <Calendar />
      <ImageCard query="dog" />
    </div>
  );
}

export default App;
