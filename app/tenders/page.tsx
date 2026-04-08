import { TendersPage } from "@/components/views/tenders-page";

type TendersRouteProps = {
  searchParams?: Promise<{
    type?: string | string[];
  }>;
};

export default async function Page({ searchParams }: TendersRouteProps) {
  const resolvedSearchParams = await searchParams;
  const typeParam = resolvedSearchParams?.type;
  const initialType = Array.isArray(typeParam) ? typeParam[0] : typeParam;

  return <TendersPage initialType={initialType} />;
}
