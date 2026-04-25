import Loading from "@/app/loading";
import { Application } from "@/components/dashboard/application/page";
import React, { Suspense } from "react";

export default function page() {
  return (
    <Suspense
      fallback={
        <>
          <Loading></Loading>
        </>
      }
    >
      <Application></Application>
    </Suspense>
  );
}
