import Loading from "@/app/loading";
import { Suspense } from "react";
import dynamic from "next/dynamic";

const ContactPage = dynamic(() => import("@/components/views/contact"));

export default function Contact() {
  return (
    <Suspense fallback={<Loading />}>
      <ContactPage />
    </Suspense>
  );
}