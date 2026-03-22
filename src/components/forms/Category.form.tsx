import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { categorySchema, CategoryType } from "@/components/schema/vehicle.schema";
import { Form } from "@/components/ui/form";
import { useEffect } from "react";
import { IVehicleCategory } from "@/components/interface/vehicle.interface";
import TextField from "./fields/TextField";
import TextAreaField from "./fields/TextAreaField";
import NumericField from "./fields/NumericField";
import SubmitButton from "./fields/SubmitButton";
import ImagePickerField from "./fields/ImagePickerField";

interface CategoryFormProps {
  defaultValues?: IVehicleCategory;
  onSubmit: (data: CategoryType) => void;
  isPending: boolean;
}

export default function CategoryForm({
  defaultValues,
  onSubmit,
  isPending,
}: CategoryFormProps) {
  const form = useForm<CategoryType>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: "",
      slug: "",
      description: "",
      order: "0",
      imageUrl: undefined,
      characteristics: "",
    },
  });

  useEffect(() => {
    if (defaultValues) {
      form.reset({
        name: defaultValues.name,
        slug: defaultValues.slug,
        description: defaultValues.description,
        order: defaultValues.order.toString(),
        imageUrl: defaultValues.imageUrl as any,
        characteristics: Array.isArray(defaultValues.characteristics) 
          ? JSON.stringify(defaultValues.characteristics) 
          : defaultValues.characteristics,
      });
    }
  }, [defaultValues, form]);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col md:flex-row w-full space-y-4 md:space-y-0 md:space-x-4"
      >
        <div className="flex-1">
          <ImagePickerField
            control={form.control}
            name="imageUrl"
            label="Category Image"
          />
        </div>
        <div className="flex flex-col w-full md:w-[350px] space-y-4">
          <TextField
            control={form.control}
            name="name"
            placeholder="Category Name (e.g. Sedan)"
            label="Name"
          />
          <TextField
            control={form.control}
            name="slug"
            placeholder="URL Slug (e.g. sedan)"
            label="Slug"
          />
          <TextAreaField
            control={form.control}
            name="description"
            placeholder="Category Description"
            label="Description"
          />
          <TextField
            control={form.control}
            name="characteristics"
            placeholder='Characteristics (JSON array e.g. ["4 Doors", "5 Seats"])'
            label="Characteristics"
          />
          <NumericField
            control={form.control}
            name="order"
            placeholder="Order"
            label="Order"
          />
          <SubmitButton title="Submit" loading={isPending} className="w-full" />
        </div>
      </form>
    </Form>
  );
}
