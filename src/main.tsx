import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import { HomePage } from "./pages/HomePage.tsx";
import { SearchPage } from "./pages/SearchPage.tsx";
import { JobPage } from "./pages/JobPage.tsx";
import "./styles/main.scss";
import { PageLayout } from "./layouts/PageLayout.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      staleTime: 1000 * 60 * 5,
      gcTime: 1000 * 60 * 10,
      enabled: false,
    },
  },
});

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      <Routes>
        {/* <Route path="/" element={<HomePage />} /> */}
        <Route element={<PageLayout />}>
          {/* <Route path="/search" element={<SearchPage />} /> */}
          <Route path="/" element={<SearchPage />} />
          <Route path="/job/:jobId" element={<JobPage />} />
        </Route>
      </Routes>
    </QueryClientProvider>
  </BrowserRouter>
);
