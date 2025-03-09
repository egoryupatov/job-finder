import Avatar from "antd/es/avatar/avatar";
import { Job } from "../types/job";
import { getRating } from "../utils/utils";

interface Props {
  job: Job;
}

export const SidebarCard: React.FC<Props> = ({ job }) => {
  const { score, percentage, feedback } = getRating();

  return (
    <div className="sidebarCard__wrapper">
      <div className="sidebarCard__avatar">
        <Avatar
          style={{ border: "#fde3cf 1px solid" }}
          size={48}
          src={job.employer_logo}
        />
      </div>
      <div className="sidebarCard__info-wrapper">
        <div className="sidebarCard__title">{job.employer_name}</div>
        <div className="sidebarCard__rating-wrapper">
          <div className="sidebarCard__rating-score">{score}</div>
          <div className="sidebarCard__rating-stars">{percentage}</div>
          <div className="sidebarCard__rating-feedback">{feedback}</div>
        </div>
      </div>
    </div>
  );
};
