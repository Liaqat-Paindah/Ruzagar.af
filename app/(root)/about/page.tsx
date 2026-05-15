import Loading from "@/app/loading";
import { Suspense } from "react";
import dynamic from "next/dynamic";

const AboutPageComponent = dynamic(() => import("@/components/views/about"));

export default function AboutPage() {
  return (
    <Suspense fallback={<Loading />}>
      <AboutPageComponent />
    </Suspense>
  );
}