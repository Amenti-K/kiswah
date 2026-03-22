"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  gallerySchema,
  GalleryFormType,
} from "@/components/schema/gallery.schema";
import { Form } from "@/components/ui/form";
import SubmitButton from "./fields/SubmitButton";
import MultipleImagePickerField from "./fields/MultipleImagePickerField";

interface GalleryFormProps {
  onSubmit: (data: GalleryFormType) => void;
  isPending: boolean;
}

export default function GalleryForm({
  onSubmit,
  isPending,
}: GalleryFormProps) {
  const form = useForm<GalleryFormType>({
    resolver: zodResolver(gallerySchema),
    defaultValues: {
      images: [],
    },
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col space-y-6 w-full"
      >
        <div className="w-full">
          <MultipleImagePickerField
            control={form.control}
            name="images"
            label="Gallery Images"
          />
        </div>

        <div className="flex justify-end pt-4">
          <SubmitButton
            title={"Upload Images"}
            loading={isPending}
            className="w-full md:w-auto"
          />
        </div>
      </form>
    </Form>
  );
}
