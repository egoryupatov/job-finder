export interface GetJobsParams {
  query: string;
  page?: number;
  numPages?: number;
  country?: string;
  datePosted?: string;
  workFromHome?: boolean;
}

export interface GetJobDetailsParams {
  jobId: string;
  country?: string;
}

export interface GetJobSalaryParams {
  jobTitle: string;
  location?: string;
  locationType?: string;
  yearsOfExperience?: string;
}

export interface GetCompanyJobSalaryParams {
  company: string;
  jobTitle?: string;
  locationType?: string;
  yearsOfExperience?: string;
}

export interface GetJobsResponse {}
export interface GetJobDetailsResponse {}
export interface GetJobSalaryResponse {}
export interface GetCompanyJobSalaryResponse {}
