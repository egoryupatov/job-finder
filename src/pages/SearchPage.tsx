import { Input, Pagination, Skeleton } from "antd";
import { ChangeEvent, useEffect, useState } from "react";
import { JobCard } from "../components/JobCard";
import { Job } from "../types/job";
import { SearchFilters } from "../components/SearchFilters";
import { GetJobsParams } from "../api/jobs/types/jobs";
import { useGetJobs } from "../api/jobs/jobs";
import { useSearchResultsStore } from "../store/searchResultsStore";

export const SearchPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState<string>("");
  const [appliedFilters, setAppliedFilters] = useState<GetJobsParams>({});

  const { searchResults, setNewSearchResults } = useSearchResultsStore();

  const {
    data: jobs,
    isLoading,
    refetch,
  } = useGetJobs({
    ...appliedFilters,
    query: debouncedSearchQuery,
    employment_types: appliedFilters?.employment_types?.join(", "),
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  useEffect(() => {
    if (jobs) {
      setNewSearchResults(jobs);
    }
  }, [jobs, setNewSearchResults]);

  useEffect(() => {
    const searchQueryTimeout = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
    }, 2000);

    return () => {
      clearTimeout(searchQueryTimeout);
    };
  }, [searchQuery]);

  useEffect(() => {
    if (debouncedSearchQuery || Object.keys(appliedFilters).length) {
      refetch();
    }
  }, [debouncedSearchQuery, appliedFilters, refetch]);

  if (isLoading) {
    return (
      <div className="wrapper">
        <div className="page-content__wide">
          <div>
            <Input
              placeholder="Start searching for a job..."
              onChange={handleInputChange}
            />
          </div>
          <div className="search_results__wrapper">
            <div className="search_results__filters">
              <Skeleton active />
            </div>
            <div className="search_results__serp">
              {Array.from({ length: 8 }).map((_, index) => (
                <Skeleton key={index} active />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="wrapper">
      <div className="page-content__wide">
        <div>
          <Input
            placeholder="Start searching for a job..."
            onChange={handleInputChange}
          />
        </div>
        <div className="search_results__wrapper">
          <div className="search_results__filters">
            <SearchFilters
              onFiltersChange={setAppliedFilters}
              appliedFilters={appliedFilters}
            />
          </div>
          <div className="search_results__serp">
            {!!searchResults?.length ? (
              <>
                {searchResults.map((job: Job) => (
                  <JobCard job={job} key={job.job_id} />
                ))}
                <div className="search_results__pagination">
                  <Pagination
                    align="center"
                    current={appliedFilters.page ?? 1}
                    total={100}
                    showSizeChanger={false}
                    onChange={(page) =>
                      setAppliedFilters((filters: GetJobsParams) => ({
                        ...filters,
                        page: page,
                      }))
                    }
                  />
                </div>
              </>
            ) : (
              <div>No results found</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
