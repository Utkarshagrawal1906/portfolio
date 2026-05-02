import Home from "./components/Home/Home";
import Project from "./components/Project/Project";
import FilteredProjects from "./components/FilteredProjects/FilteredProjects";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/projects/:slug" element={<Project />} />
      <Route path="/services/:category" element={<FilteredProjects />} />
    </Routes>
  );
}

export default App;