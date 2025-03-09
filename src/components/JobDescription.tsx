import { Job, JobHighlights } from "../types/job";

interface Props {
  job: Job;
}

const highlightValues = ["Qualifications", "Benefits", "Responsibilities"];

const displayHighlights = (highlights) => {
  return highlightValues.map((highlight) => {
    if (highlights[highlight]) {
      return (
        <div key={highlight}>
          <div className="job-description__section-title">{highlight}:</div>
          <div>
            <ul>
              {highlights[highlight].map((text, index) => (
                <li key={index}>- {text}</li>
              ))}
            </ul>
          </div>
        </div>
      );
    }
    return null;
  });
};

export const JobDescription: React.FC<Props> = ({ job }) => {
  return (
    <div className="job-description__wrapper">
      {displayHighlights(job.job_highlights)}
    </div>
  );
};
