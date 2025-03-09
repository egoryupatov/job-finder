import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "./main";
import {
  GetCompanyJobSalaryParams,
  GetCompanyJobSalaryResponse,
  GetJobDetailsParams,
  GetJobDetailsResponse,
  GetJobsParams,
  GetJobsResponse,
} from "./types/jobs";

// hooks

export const useGetJobs = (params: GetJobsParams) => {
  return useQuery<GetJobsResponse[], Error>({
    queryKey: ["jobs", params],
    queryFn: () => getJobs(params),
  });
};

export const useGetJobDetails = ({ jobId, country }: GetJobDetailsParams) => {
  return useQuery<GetJobDetailsResponse, Error>({
    queryKey: ["jobDetails", jobId, country],
    queryFn: () => getJobDetails({ jobId, country }),
  });
};

export const useGetCompanyJobSalary = ({
  company,
  jobTitle,
  locationType,
  yearsOfExperience,
}: GetCompanyJobSalaryParams) => {
  return useQuery<GetCompanyJobSalaryResponse, Error>({
    queryKey: [
      "companyJobSalary",
      company,
      jobTitle,
      locationType,
      yearsOfExperience,
    ],
    queryFn: () =>
      getCompanyJobSalary({
        company,
        jobTitle,
        locationType,
        yearsOfExperience,
      }),
  });
};

// api methods

export const getJobs = async (
  params: GetJobsParams
): Promise<GetJobsResponse[]> => {
  const response = await axiosInstance.get("search", {
    params: {
      ...params,
    },
  });
  return response.data.data;
};

export const getJobDetails = async ({
  jobId,
  country,
}: GetJobDetailsParams): Promise<GetJobDetailsResponse> => {
  const response = await axiosInstance.get("job-details", {
    params: {
      job_id: jobId,
      country: country,
    },
  });
  return response.data.data;
};

export const getCompanyJobSalary = async ({
  company,
  jobTitle,
  locationType,
  yearsOfExperience,
}: GetCompanyJobSalaryParams): Promise<GetCompanyJobSalaryResponse> => {
  const response = await axiosInstance.get("company-job-salary", {
    params: {
      company: company,
      job_title: jobTitle,
      location_type: locationType,
      years_of_experience: yearsOfExperience,
    },
  });
  return response.data.data;
};
