import { Button, Tag } from "antd";
import { Job } from "../types/job";
import { formatSalary } from "../utils/utils";
import { JobBenefits } from "../constants/job";

interface JobCardProps {
  job: Job;
}

export const JobCard: React.FC<JobCardProps> = ({ job }) => {
  return (
    <div className="jobCard__wrapper">
      <div className="jobCard__title">{job.job_title}</div>
      <div className="jobCard__salary">
        {formatSalary(job.job_min_salary, job.job_max_salary)}
        {job.job_benefits && (
          <div className="jobCard__tags">
            {job.job_benefits.map((benefit: string) => (
              <Tag>{JobBenefits[benefit]}</Tag>
            ))}
          </div>
        )}
      </div>
      <div className="jobCard__employer">{job.employer_name}</div>
      <div className="jobCard__location">{job.job_location}</div>
      <Button className="jobCard__apply-button">Apply</Button>
    </div>
  );
};
