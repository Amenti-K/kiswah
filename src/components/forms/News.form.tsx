"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { newsSchema, NewsType } from "@/components/schema/news.schema";
import { Form } from "@/components/ui/form";
import { useEffect } from "react";
import { INews } from "@/components/interface/news.interface";
import TextField from "./fields/TextField";
import TextAreaField from "./fields/TextAreaField";
import SubmitButton from "./fields/SubmitButton";
import MultipleImagePickerField from "./fields/MultipleImagePickerField";
import SimpleCheckboxField from "./fields/SimpleCheckboxField";

interface NewsFormProps {
  defaultValues?: INews;
  onSubmit: (data: NewsType) => void;
  isPending: boolean;
}

export default function NewsForm({
  defaultValues,
  onSubmit,
  isPending,
}: NewsFormProps) {
  const form = useForm<NewsType>({
    resolver: zodResolver(newsSchema),
    defaultValues: {
      title: "",
      description: "",
      published: false,
      images: [],
    },
  });

  useEffect(() => {
    if (defaultValues) {
      form.reset({
        title: defaultValues.title,
        description: defaultValues.description,
        published: defaultValues.published,
        images: defaultValues.imageUrls as any, // Existing URLs to prepopulate previews
      });
    }
  }, [defaultValues, form]);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col w-full gap-6"
      >
        <div className="flex-1">
           <MultipleImagePickerField
              control={form.control}
              name="images"
              label="News Images"
           />
        </div>
        
        <div className="flex flex-col w-full space-y-4">
          <TextField
            control={form.control}
            name="title"
            placeholder="News Title"
            label="Title"
          />
          <TextAreaField
            control={form.control}
            name="description"
            placeholder="Detailed description or content of the news..."
            label="Description"
          />
          <div className="py-2">
            <SimpleCheckboxField
              control={form.control}
              name="published"
              label="Publish Immediately"
            />
          </div>
          <div className="pt-4">
             <SubmitButton title={defaultValues ? "Update News" : "Create News"} loading={isPending} className="w-full" />
          </div>
        </div>
      </form>
    </Form>
  );
}
