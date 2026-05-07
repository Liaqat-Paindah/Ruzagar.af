  'use client'

import { useGetJobsByUser } from "@/hooks/useJobs";
import React from "react";

export const Application = () => {
  const { data, isLoading, error } = useGetJobsByUser();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Something went wrong</div>;

  return (
    <div>
      {data?.map((job: any) => (
        <div key={job.id}>
          <h3>{job.title}</h3>
          <p>{job.description}</p>
        </div>
      ))}
    </div>
  );
};
