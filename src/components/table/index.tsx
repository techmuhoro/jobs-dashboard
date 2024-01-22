import {
  Table,
  TableHeader,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import Link from "next/link";
import {
  ChevronLast,
  ChevronLeft,
  ChevronFirst,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export type TableColumn = {
  assessor: string;
  label: string;
};

interface CustomTableProps<T> {
  data: T[];
  columns: TableColumn[];
  currentPage: number;
  totalPages: number;
  count: number;
  baseUrl: string;
  searchParams: string;
}

export default function CustomTable<T>({
  data,
  columns,
  baseUrl,
  count,
  currentPage,
  searchParams,
  totalPages,
}: CustomTableProps<T>) {
  function getPaginationLink(page: number) {
    let url = `${baseUrl}/?page=${page}`;

    // append any existing seach params
    url = searchParams ? url + `&${searchParams}` : url;

    return url;
  }
  return (
    <>
      <div
        className="mb-1 flex
       justify-end"
      >
        {currentPage === -1 ? (
          <Link href={getPaginationLink(1)} className="hover:underline">
            Paginate
          </Link>
        ) : (
          <Link href={getPaginationLink(-1)} className="hover:underline">
            Show All
          </Link>
        )}
      </div>
      <Table className="border">
        <TableHeader>
          <TableRow>
            <TableHead> S/N</TableHead>
            {columns.map(({ label }) => (
              <TableHead key={label}> {label}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item: any, index) => (
            <TableRow key={item.id}>
              <TableCell>{index + 1}</TableCell>
              {columns.map(({ assessor }) => (
                <TableCell key={`${item.id}-${assessor}`}>
                  {item[assessor]}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {currentPage >= 1 && (
        <div className="mt-2 flex justify-end">
          <div className="flex items-center gap-x-2">
            <div>
              <Link
                href={getPaginationLink(1)}
                className={cn(
                  "inline-block rounded px-3 py-2 hover:bg-muted",
                  currentPage <= 1 &&
                    "pointer-events-none text-muted-foreground",
                )}
              >
                <ChevronFirst />
              </Link>

              <Link
                href={getPaginationLink(currentPage - 1)}
                className={cn(
                  "inline-block rounded px-3 py-2 hover:bg-muted",
                  currentPage <= 1 &&
                    "pointer-events-none text-muted-foreground",
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
                href={getPaginationLink(currentPage + 1)}
                className={cn(
                  "inline-block rounded px-3 py-2 hover:bg-muted",
                  currentPage >= totalPages &&
                    "pointer-events-none text-muted-foreground",
                )}
              >
                <ChevronRight />
              </Link>

              <Link
                href={getPaginationLink(totalPages)}
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
      )}
    </>
  );
}
