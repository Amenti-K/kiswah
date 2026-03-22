"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TeamSchema, TeamType } from "@/components/schema/team.schema";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import TextField from "./fields/TextField";
import NumericField from "./fields/NumericField";

interface TeamFormProps {
  defaultValues?: Partial<TeamType>;
  onSubmit: (values: TeamType) => void;
  isPending?: boolean;
}

export default function TeamForm({ defaultValues, onSubmit, isPending }: TeamFormProps) {
  const form = useForm<any>({
    resolver: zodResolver(TeamSchema),
    defaultValues: {
      name: defaultValues?.name || "",
      order: defaultValues?.order || 0,
      staffs: defaultValues?.staffs || [],
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit((v) => onSubmit(v as any))} className="space-y-4">
        <TextField 
          control={form.control} 
          name="name" 
          label="Team Name" 
          placeholder="e.g. Leadership, Marketing, etc."
        />
        <NumericField 
          control={form.control} 
          name="order" 
          label="Display Order" 
          placeholder="0"
        />
        <div className="flex justify-end pt-4">
          <Button type="submit" disabled={isPending}>
            {isPending ? "Saving..." : "Save Team"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
