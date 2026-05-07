  'use client'

import { JobsResponse, PostJobResponse } from "@/type/jobs";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export const usePostJobs = () => {
  const router = useRouter();
  return useMutation<
    PostJobResponse,
    AxiosError<{ message?: string }>,
    FormData
  >({
    mutationKey: ["PostJobs"],

    mutationFn: async (formData: FormData) => {
      const response = await axios.post("/api/jobs", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      return response.data;
    },

    onSuccess: (response) => {
      router.push("/dashboard");
      toast.success(response.message);
    },

    onError: (error) => {
      toast.error(error.response?.data?.message || error.message);
    },
  });
};

export const GetJobs = () => {
  return useQuery({
    queryKey: ["getJobs"],
    queryFn: async () => {
      const response = await axios.get<JobsResponse>("/api/jobs");
      return response.data;
    },
    retryOnMount: false,
    refetchOnWindowFocus: false,
    retry: 1,
    staleTime: 5 * 60 * 1000,
  });
};




export const useGetJobsByUser  = () => {
  return useQuery({
    queryKey: ["getJobsApplication"],
    queryFn: async () => {
      const response = await axios.get("/api/application");
      return response.data;
    },
    retryOnMount: false,
    refetchOnWindowFocus: false,
    retry: 1,
    staleTime: 5 * 60 * 1000,
  });
};