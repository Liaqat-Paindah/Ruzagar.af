import Loading from "@/app/loading";
import { Suspense } from "react";
import dynamic from "next/dynamic";

const SkillsPage = dynamic(() => import("@/components/views/skills"));

export default function Skills() {
  return (
    <Suspense fallback={<Loading />}>
      <SkillsPage />
    </Suspense>
  );
}