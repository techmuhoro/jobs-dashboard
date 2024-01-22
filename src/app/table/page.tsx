import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import prisma from "@/lib/prisma";
import { cn, formatMoney } from "@/lib/utils";
import {
  ChevronLast,
  ChevronLeft,
  ChevronFirst,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface PageProps {
  searchParams: {
    page?: string | undefined;
  };
}

export default async function Page({ searchParams: { page } }: PageProps) {
  const currentPage = isNaN(Number(page)) ? 1 : Number(page);

  const rowsPerPage = 2;

  const jobsPromise = prisma.job.findMany({
    where: { approved: true },
    take: rowsPerPage,
    skip: (currentPage - 1) * rowsPerPage,
  });

  const countPromise = prisma.job.count({ where: { approved: true } });

  const [jobs, count] = await Promise.all([jobsPromise, countPromise]);

  const totalPages = Math.ceil(count / rowsPerPage);

  function generateLink(page: number) {
    return `/table/?page=${page}`;
  }

  console.log(generateLink(3));

  return (
    <main className="mx-auto my-5 max-w-5xl">
      <Table className="rounded border">
        {/* <TableCaption>A list of available jobs</TableCaption> */}
        <TableHeader>
          <TableRow>
            <TableHead>S/N</TableHead>
            <TableHead>Job</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Location Type</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Salary</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {jobs.map((job, index) => (
            <TableRow key={job.id}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{job.title}</TableCell>
              <TableCell>{job.companyName}</TableCell>
              <TableCell>{job.locationType}</TableCell>
              <TableCell>{job.location ? job.location : "Worldwide"}</TableCell>
              <TableCell>{formatMoney(job.salary)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="mt-2 flex justify-end">
        <div className="flex items-center gap-x-2">
          <div>
            <Link
              href={generateLink(1)}
              //   className="pointer-events-none inline-block cursor-none border border-red-600 px-3 py-2 text-muted-foreground"
              className={cn(
                "inline-block rounded px-3 py-2 hover:bg-muted",
                currentPage <= 1 && "pointer-events-none text-muted-foreground",
              )}
            >
              <ChevronFirst />
            </Link>

            <Link
              href={generateLink(currentPage - 1)}
              className={cn(
                "inline-block rounded px-3 py-2 hover:bg-muted",
                currentPage <= 1 && "pointer-events-none text-muted-foreground",
              )}
            >
              <ChevronLeft />
            </Link>
          </div>
          <span className="-mt-1 inline-block rounded px-3 py-2 hover:bg-muted">
            {currentPage}
          </span>
          <div>
            <Link
              href={generateLink(currentPage + 1)}
              className={cn(
                "inline-block rounded px-3 py-2 hover:bg-muted",
                currentPage >= totalPages &&
                  "pointer-events-none text-muted-foreground",
              )}
            >
              <ChevronRight />
            </Link>

            <Link
              href={generateLink(totalPages)}
              className={cn(
                "inline-block rounded px-3 py-2 hover:bg-muted",
                currentPage >= totalPages &&
                  "pointer-events-none text-muted-foreground",
              )}
            >
              <ChevronLast />
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
