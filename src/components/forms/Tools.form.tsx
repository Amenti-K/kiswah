"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  toolsSchema,
  ToolsFormType,
  fileTypes,
} from "@/components/schema/tools.schema";
import { Form } from "@/components/ui/form";
import { useEffect } from "react";
import { ITool } from "@/components/interface/gallery.interface";
import TextField from "./fields/TextField";
import TextAreaField from "./fields/TextAreaField";
import SelectField from "./fields/SelectField";
import SubmitButton from "./fields/SubmitButton";
import FilePickerField from "./fields/FilePickerField";

interface ToolsFormProps {
  defaultValues?: ITool;
  onSubmit: (data: ToolsFormType) => void;
  isPending: boolean;
}

export default function ToolsForm({
  defaultValues,
  onSubmit,
  isPending,
}: ToolsFormProps) {
  const form = useForm<ToolsFormType>({
    resolver: zodResolver(toolsSchema),
    defaultValues: {
      title: "",
      description: "",
      type: undefined as any,
      fileUrl: "",
    },
  });

  useEffect(() => {
    if (defaultValues) {
      form.reset({
        title: defaultValues.title,
        description: defaultValues.description || "",
        type: defaultValues.type,
        fileUrl: defaultValues.fileUrl,
      });
    }
  }, [defaultValues, form]);

  const typeOptions = fileTypes.map((t) => ({ label: t, value: t }));

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col space-y-6 w-full"
      >
        <TextField
          control={form.control}
          name="title"
          placeholder="Tool or Document Title"
          label="Title"
        />

        <TextAreaField
          control={form.control}
          name="description"
          placeholder="Detailed description..."
          label="Description"
        />

        <SelectField
          control={form.control}
          name="type"
          label="File Type"
          placeholder="Select File Type"
          options={typeOptions}
        />

        <TextField
          control={form.control}
          name="fileUrl"
          label="Document Link (Google Drive, etc.)"
          placeholder="https://drive.google.com/..."
        />

        <div className="flex justify-end pt-4">
          <SubmitButton
            title={defaultValues ? "Update Tool" : "Add Tool"}
            loading={isPending}
            className="w-full md:w-auto"
          />
        </div>
      </form>
    </Form>
  );
}
