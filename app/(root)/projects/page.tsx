import Loading from "@/app/loading";
import { Suspense } from "react";
import dynamic from "next/dynamic";

const ProjectPage = dynamic(() => import("@/components/views/projects"));

export default function projects() {
  return (
    <Suspense fallback={<Loading />}>
      <ProjectPage />
    </Suspense>
  );
}