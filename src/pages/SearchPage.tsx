import { Input } from "antd";
import { ChangeEvent, useEffect, useState } from "react";
import { getJobs } from "../api/jobs/jobs";
import { JobCard } from "../components/JobCard";
import { Job } from "../types/job";

export const SearchPage: React.FC = () => {
  const [jobs, setJobs] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState<string>("");

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchRequest = async () => {
    const searchRequestResults = await getJobs({ query: debouncedSearchQuery });
    setJobs(searchRequestResults);
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
    !!debouncedSearchQuery && handleSearchRequest();
  }, [debouncedSearchQuery]);

  return (
    <div className="wrapper">
      <div className="page-content__wide">
        <div>
          <Input
            placeholder="Start searching for a job..."
            onChange={handleInputChange}
          />
        </div>
        {!!jobs.length && (
          <div className="search_results__wrapper">
            {jobs.map((job: Job) => (
              <JobCard job={job} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
