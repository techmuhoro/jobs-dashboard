import CustomTable from "@/components/table";
import prisma from "@/lib/prisma";
import { Job } from "@prisma/client";
import { TableColumn } from "@/components/table";
import { Prisma } from "@prisma/client";

const columns: TableColumn[] = [
  { assessor: "title", label: "Job" },
  { assessor: "type", label: "Type" },
  { assessor: "locationType", label: "Location type" },
  { assessor: "location", label: "Location" },
  { assessor: "salary", label: "Salary" },
];

interface PageProps {
  searchParams: {
    page?: string | undefined;
  };
}
export default async function Page({ searchParams: { page } }: PageProps) {
  const currentPage = isNaN(Number(page)) ? 1 : Number(page);

  let jobsPromise;
  const rowsPerPage = 2;

  const where: Prisma.JobWhereInput = {
    approved: true,
  };

  // use has disable pagination
  if (currentPage === -1) {
    jobsPromise = prisma.job.findMany({ where });
  } else {
    jobsPromise = prisma.job.findMany({
      where,
      take: rowsPerPage,
      skip: (currentPage - 1) * rowsPerPage,
    });
  }

  // const jobsPromise = prisma.job.findMany({
  //   where,
  //   take: rowsPerPage,
  //   skip: (currentPage - 1) * rowsPerPage,
  // });

  const countPromise = prisma.job.count({ where });

  const [jobs, count] = await Promise.all([jobsPromise, countPromise]);

  const totalPages = Math.ceil(count / rowsPerPage);

  return (
    <main className="mx-auto my-5 max-w-5xl">
      {/** For data tables use @tanstack */}
      <CustomTable<Job>
        data={jobs}
        columns={columns}
        baseUrl="/table/reusable"
        currentPage={currentPage}
        totalPages={totalPages}
        count={count}
        searchParams=""
      />
    </main>
  );
}
