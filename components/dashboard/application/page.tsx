"use client";

import { useGetJobsByUser } from "@/hooks/useJobs";
import JobsTable from "./jobs-table";
import Loading from "@/app/loading";

export const Application = () => {
  const { data, isLoading, error } = useGetJobsByUser();

  if (isLoading) return <Loading />;
  if (error) return <div>Something went wrong</div>;

  return (
    <div className="p-12">
      <JobsTable data={data || []} />
    </div>
  );
};