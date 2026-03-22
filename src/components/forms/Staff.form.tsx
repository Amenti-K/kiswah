"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { StaffSchema, StaffType } from "@/components/schema/team.schema";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import TextField from "./fields/TextField";
import NumericField from "./fields/NumericField";
import ImagePickerField from "./fields/ImagePickerField";

interface StaffFormProps {
  defaultValues?: Partial<StaffType>;
  onSubmit: (values: StaffType) => void;
  isPending?: boolean;
}

export default function StaffForm({ defaultValues, onSubmit, isPending }: StaffFormProps) {
  const form = useForm<any>({
    resolver: zodResolver(StaffSchema),
    defaultValues: {
      name: defaultValues?.name || "",
      position: defaultValues?.position || "",
      imageUrl: defaultValues?.imageUrl || "",
      order: defaultValues?.order || 0,
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit((v) => onSubmit(v as any))} className="space-y-4">
        <TextField 
          control={form.control} 
          name="name" 
          label="Full Name" 
          placeholder="Enter staff name"
        />
        <TextField 
          control={form.control} 
          name="position" 
          label="Position" 
          placeholder="e.g. CEO, Developer, etc."
        />
        <ImagePickerField 
          control={form.control} 
          name="imageUrl" 
          label="Staff Photo" 
        />
        <NumericField 
          control={form.control} 
          name="order" 
          label="Display Order" 
          placeholder="0"
        />
        <div className="flex justify-end pt-4">
          <Button type="submit" disabled={isPending}>
            {isPending ? "Saving..." : "Save Staff"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
