import JobPage from "@/components/JobPage";
import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import AdminSidebar from "./AdminSidebar";
interface PageProps {
  params: {
    slug: string;
  };
}

export default async function Page({ params: { slug } }: PageProps) {
  const job = await prisma.job.findUnique({ where: { slug } });

  if (!job) notFound();

  return (
    <main className="px-w m-auto my-10 flex max-w-5xl flex-col items-center gap-5 md:flex-row md:items-start">
      <JobPage job={job} />
      <AdminSidebar job={job} />
    </main>
  );
}
