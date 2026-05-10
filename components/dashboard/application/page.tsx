"use client";

import { useGetJobsByUser } from "@/hooks/useJobs";
import JobsTable from "./jobs-table";

export const Application = () => {
  const { data, isLoading, error } = useGetJobsByUser();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Something went wrong</div>;

  return (
    <div className="p-12">
      <JobsTable data={data || []} />
    </div>
  );
};