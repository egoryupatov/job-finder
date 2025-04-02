import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useGetJobDetails, useGetJobs } from "../api/jobs/jobs";
import { JobCard } from "../components/JobCard";
import { SidebarCard } from "../components/SidebarCard";
import { JobDescription } from "../components/JobDescription";
import { Skeleton } from "antd";
import { Job } from "../types/job";

export const JobPage: React.FC = () => {
  const params = useParams();

  const [jobData, setJobData] = useState(null);
  const [relatedJobsData, setRelatedJobsData] = useState([]);
  const [isAllDataLoaded, setIsAllDataLoaded] = useState<boolean>(false);

  const { refetch: getJobData } = useGetJobDetails({
    jobId: params.jobId,
  });

  const { refetch: getRelatedJobsData } = useGetJobs({
    query: jobData ? jobData.job_title : "",
  });

  useEffect(() => {
    setIsAllDataLoaded(false);
    const getData = async () => {
      const qwerty = await getJobData();
      setJobData(qwerty.data[0]);
    };

    getData();
  }, [params.jobId]);

  useEffect(() => {
    const getData = async () => {
      const data = await getRelatedJobsData();
      setRelatedJobsData(data.data);
      setIsAllDataLoaded(true);
    };

    if (jobData) {
      getData();
    }
  }, [jobData]);

  if (!isAllDataLoaded) {
    return (
      <div className="wrapper">
        <div className="page-content__narrow">
          <div className="job-page__wrapper">
            <div className="job-page__job-info">
              <Skeleton active />
            </div>
            <div className="job-page__recommendations">
              <Skeleton active />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="wrapper">
      <div className="page-content__narrow">
        {jobData && (
          <div className="job-page__wrapper">
            <div className="job-page__job-info">
              <JobCard job={jobData} />
              <JobDescription job={jobData} />
              <div>
                <div className="job-description__section-title">
                  You might be interested:
                </div>
                <div className="search_results__serp">
                  {relatedJobsData.map((job: Job) => (
                    <JobCard job={job} key={job.job_id} />
                  ))}
                </div>
              </div>
            </div>
            <div className="job-page__recommendations">
              <SidebarCard job={jobData} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
