import Home from "./components/Home/Home";
import Project from "./components/Project/Project";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/projects/:slug" element={<Project />} />
    </Routes>
  );
}

export default App;