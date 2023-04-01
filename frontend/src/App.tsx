import React from "react";
import { Route, Routes } from "react-router-dom";
import { Home } from "./components/Home";
import { Test } from "./components/Test";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/test" element={<Test />} />
      <Route path="/home" element={<Home />} />
    </Routes>
  );
}

export default App;
