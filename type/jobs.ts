export type JobFormValues = {
  title: string;
  company: string;
  location: string;
  salary: string;
  vacancies: number;
  jobType: string;
  gender: string;
  skills: string;
  description: string;
  deadline: string;
  postedDate: string;
  contactEmail: string;
  remoteOption: string;
  status: string;
  companyLogo: File | null;
  userId: string;
};

export type Job = Omit<JobFormValues, "companyLogo"> & {
  id: string | number;
  companyLogo: string;
  created_at?: string;
  updated_at?: string;
};

export type JobsResponse = {
  success: boolean;
  message: string;
  data: Job[];
};

export type PostJobResponse = {
  success: boolean;
  message: string;
  data?: Job;
};
