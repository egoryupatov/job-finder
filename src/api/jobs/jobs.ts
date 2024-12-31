import { axiosInstance } from "./main";
import {
  GetCompanyJobSalaryParams,
  GetCompanyJobSalaryResponse,
  GetJobDetailsParams,
  GetJobDetailsResponse,
  GetJobSalaryParams,
  GetJobSalaryResponse,
  GetJobsParams,
  GetJobsResponse,
} from "./types/jobs";

export const getJobs = async ({
  query,
  page,
  numPages,
  country,
  datePosted,
  workFromHome,
}: GetJobsParams): Promise<GetJobsResponse[] | null> => {
  const response = await axiosInstance.get("search", {
    params: {
      query: query,
      page: page,
      num_pages: numPages,
      country: country,
      date_posted: datePosted,
      work_from_home: workFromHome,
    },
  });
  return response.data.data;
};

export const getJobDetails = async ({
  jobId,
  country,
}: GetJobDetailsParams): Promise<GetJobDetailsResponse | null> => {
  const data = await axiosInstance.get("job-details", {
    params: {
      job_id: jobId,
      country: country,
    },
  });
  return data;
};

export const getJobSalary = async ({
  jobTitle,
  location,
  locationType,
  yearsOfExperience,
}: GetJobSalaryParams): Promise<GetJobSalaryResponse | null> => {
  const data = await axiosInstance.get("estimated-salary", {
    params: {
      job_title: jobTitle,
      location: location,
      location_type: locationType,
      years_of_experience: yearsOfExperience,
    },
  });
  return data;
};

export const getCompanyJobSalary = async ({
  company,
  jobTitle,
  locationType,
  yearsOfExperience,
}: GetCompanyJobSalaryParams): Promise<GetCompanyJobSalaryResponse | null> => {
  const data = await axiosInstance.get("company-job-salary", {
    params: {
      company: company,
      job_title: jobTitle,
      location_type: locationType,
      years_of_experience: yearsOfExperience,
    },
  });
  return data;
};
