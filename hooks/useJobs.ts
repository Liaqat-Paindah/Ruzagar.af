import { JobFormValues } from "@/app/dashboard/jobs/create/page";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

type PostJobResponse = {
  success: boolean;
  message: string;
  data?: JobFormValues;
};

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
