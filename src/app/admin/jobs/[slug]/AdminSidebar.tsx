"use client";

import { Job } from "@prisma/client";
import { Button } from "@/components/ui/button";
import FormSubmitButton from "@/components/FormSubmitButton";
import { useFormState } from "react-dom";
import { approveSubsmission, deleteJob } from "./actions";

interface AdminSidebarProps {
  job: Job;
}

export default function AdminSidebar({ job }: AdminSidebarProps) {
  return (
    <aside className="flex w-[200px] flex-none flex-row items-center gap-2 md:flex-col md:items-stretch">
      {job.approved ? (
        <span className="text-center font-semibold text-green-500">
          Approved
        </span>
      ) : (
        <ApprovedSubmissionButton jobId={job.id} />
      )}
      <DeleteJobButton jobId={job.id} />
    </aside>
  );
}

interface AdminButtonProps {
  jobId: number;
}

function ApprovedSubmissionButton({ jobId }: AdminButtonProps) {
  const [formState, formAction] = useFormState(approveSubsmission, undefined);
  return (
    <form action={formAction}>
      <input hidden name="jobId" value={jobId} />

      <FormSubmitButton className="w-full bg-green-500 text-black hover:bg-green-600">
        Approve
      </FormSubmitButton>
      {formState?.error && (
        <p className="text-sm text-red-500">{formState.error}</p>
      )}
    </form>
  );
}

function DeleteJobButton({ jobId }: AdminButtonProps) {
  const [formState, formAction] = useFormState(deleteJob, undefined);

  return (
    <form action={formAction}>
      <input hidden name="jobId" value={jobId} />

      <FormSubmitButton className="w-full bg-red-500 text-black hover:bg-red-600">
        Delete
      </FormSubmitButton>
      {formState?.error && (
        <p className="text-sm text-red-500">{formState.error}</p>
      )}
    </form>
  );
}
