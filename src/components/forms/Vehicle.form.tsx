import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { vehicleSchema, VehicleType } from "@/components/schema/vehicle.schema";
import { Form } from "@/components/ui/form";
import { useEffect } from "react";
import {
  IVehicle,
  IVehicleCategory,
} from "@/components/interface/vehicle.interface";
import TextField from "./fields/TextField";
import TextAreaField from "./fields/TextAreaField";
import NumericField from "./fields/NumericField";
import SubmitButton from "./fields/SubmitButton";
import SelectField from "./fields/SelectField";
import MultipleImagePicker from "./fields/MultipleImagePickerField";

interface VehicleFormProps {
  categories: IVehicleCategory[];
  defaultValues?: IVehicle;
  onSubmit: (data: VehicleType) => void;
  isPending: boolean;
}

export default function VehicleForm({
  categories,
  defaultValues,
  onSubmit,
  isPending,
}: VehicleFormProps) {
  const form = useForm<VehicleType>({
    resolver: zodResolver(vehicleSchema),
    defaultValues: {
      name: "",
      description: "",
      order: "0",
      categoryId: "",
      imageUrls: undefined,
    },
  });

  const categoryOptions = categories.map((cat) => ({
    label: cat.name,
    value: cat.id,
  }));

  useEffect(() => {
    if (defaultValues) {
      form.reset({
        name: defaultValues.name,
        description: defaultValues.description,
        order: defaultValues.order.toString(),
        categoryId: defaultValues.categoryId,
        imageUrls: Array.isArray(defaultValues.imageUrls)
          ? defaultValues.imageUrls[0] // Since ImagePicker handles one, just pick first for now
          : defaultValues.imageUrls,
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
          <MultipleImagePicker
            control={form.control}
            name="imageUrls"
            label="Vehicle Image"
            maxFiles={5}
          />
        </div>
        <div className="flex flex-col w-full md:w-[350px] space-y-4">
          <SelectField
            control={form.control}
            name="categoryId"
            label="Category"
            placeholder="Select a category"
            options={categoryOptions}
          />
          <TextField
            control={form.control}
            name="name"
            placeholder="Vehicle Name (e.g. Toyota Camry)"
            label="Name"
          />
          <TextAreaField
            control={form.control}
            name="description"
            placeholder="Vehicle Description"
            label="Description"
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
