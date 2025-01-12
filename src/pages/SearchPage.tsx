import { Input, Pagination, Skeleton } from "antd";
import { ChangeEvent, useEffect, useState } from "react";
import { getJobs } from "../api/jobs/jobs";
import { JobCard } from "../components/JobCard";
import { Job } from "../types/job";
import { SearchFilters } from "../components/SearchFilters";
import { GetJobsParams } from "../api/jobs/types/jobs";

export const SearchPage: React.FC = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState<string>("");
  const [isDataLoading, setIsDataLoading] = useState<boolean | null>(null);

  const [appliedFilters, setAppliedFilters] = useState<GetJobsParams>({});

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchRequestChange = async () => {
    const searchRequestResults = await getJobs({
      query: debouncedSearchQuery,
    });
    setJobs(searchRequestResults);
    setIsDataLoading(false);
  };

  const handleFiltersChange = async () => {
    const searchRequestResults = await getJobs({
      ...appliedFilters,
      query: debouncedSearchQuery,
      employment_types: appliedFilters?.employment_types?.join(", "),
    });
    setJobs(searchRequestResults);
    setIsDataLoading(false);
  };

  useEffect(() => {
    const searchQueryTimeout = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
    }, 2000);

    return () => {
      clearTimeout(searchQueryTimeout);
    };
  }, [searchQuery]);

  useEffect(() => {
    try {
      setAppliedFilters({});
      setIsDataLoading(true);
      !!debouncedSearchQuery && handleSearchRequestChange();
    } catch (e) {
      setIsDataLoading(false);
    }
  }, [debouncedSearchQuery]);

  useEffect(() => {
    if (!!Object.keys(appliedFilters).length) {
      try {
        setIsDataLoading(true);
        handleFiltersChange();
      } catch (e) {
        setIsDataLoading(false);
      }
    }
  }, [appliedFilters]);

  return (
    <div className="wrapper">
      <div className="page-content__wide">
        <div>
          <Input
            placeholder="Start searching for a job..."
            onChange={handleInputChange}
          />
        </div>
        {!isDataLoading ? (
          !!jobs.length ? (
            <div className="search_results__wrapper">
              <div className="search_results__filters">
                <SearchFilters
                  onFiltersChange={setAppliedFilters}
                  appliedFilters={appliedFilters}
                />
              </div>
              <div className="search_results__serp">
                {jobs.map((job: Job) => (
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
              </div>
            </div>
          ) : (
            <div className="search_results__wrapper">
              <div className="search_results__filters">
                <SearchFilters
                  onFiltersChange={setAppliedFilters}
                  appliedFilters={appliedFilters}
                />
              </div>
              <div className="search_results__serp">No results found</div>
            </div>
          )
        ) : (
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
        )}
      </div>
    </div>
  );
};
