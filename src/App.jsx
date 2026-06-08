import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";

const Home = lazy(() => import("./components/Home/Home"));
const Project = lazy(() => import("./components/Project/Project"));
const FilteredProjects = lazy(() => import("./components/FilteredProjects/FilteredProjects"));
const Certificates = lazy(() => import("./components/Certificates/Certificates"));

function App() {
  return (
    <Suspense fallback={null}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/certificates" element={<Certificates />} />
        <Route path="/projects/:slug" element={<Project />} />
        <Route path="/services/:category" element={<FilteredProjects />} />
      </Routes>
    </Suspense>
  );
}

export default App;
