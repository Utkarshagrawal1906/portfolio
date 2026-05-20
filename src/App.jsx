import Home from "./components/Home/Home";
import Project from "./components/Project/Project";
import FilteredProjects from "./components/FilteredProjects/FilteredProjects";
import Certificates from "./components/Certificates/Certificates";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/certificates" element={<Certificates />} />
      <Route path="/projects/:slug" element={<Project />} />
      <Route path="/services/:category" element={<FilteredProjects />} />
    </Routes>
  );
}

export default App;
