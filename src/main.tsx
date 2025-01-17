import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import { HomePage } from "./pages/HomePage.tsx";
import { SearchPage } from "./pages/SearchPage.tsx";
import { JobPage } from "./pages/JobPage.tsx";
import "./styles/main.scss";
import { PageLayout } from "./layouts/PageLayout.tsx";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route element={<PageLayout />}>
        <Route path="/search" element={<SearchPage />} />
        <Route path="/job/:jobId" element={<JobPage />} />
      </Route>
    </Routes>
  </BrowserRouter>
);
