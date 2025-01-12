export interface GetJobsParams {
  query?: string;
  page?: number;
  num_pages?: number;
  country?: string;
  date_posted?: string;
  employment_types?: string[];
  work_from_home?: boolean;
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
