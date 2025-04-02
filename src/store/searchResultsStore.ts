import { create } from "zustand";
import { Job } from "../types/job";

interface SearchResultsState {
  searchResults: Job[];
  setNewSearchResults: (newSearchResults: Job[]) => void;
}

export const useSearchResultsStore = create<SearchResultsState>()((set) => ({
  searchResults: [],
  setNewSearchResults: (newSearchResults) =>
    set((state) => ({ searchResults: newSearchResults })),
}));
