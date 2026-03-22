"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { serviceSchema, ServiceType } from "@/components/schema/service.schema";
import { Form } from "@/components/ui/form";
import { useEffect } from "react";
import { IService } from "@/components/interface/service.interface";
import TextField from "./fields/TextField";
import TextAreaField from "./fields/TextAreaField";
import NumericField from "./fields/NumericField";
import SubmitButton from "./fields/SubmitButton";
import IconPickerField from "./fields/IconPickerField";
import { motion } from "motion/react";

interface ServiceFormProps {
  defaultValues?: IService;
  onSubmit: (data: ServiceType) => void;
  isPending: boolean;
}

export default function ServiceForm({
  defaultValues,
  onSubmit,
  isPending,
}: ServiceFormProps) {
  const form = useForm<ServiceType>({
    resolver: zodResolver(serviceSchema),
    defaultValues: {
      title: "",
      description: "",
      order: "1",
      iconName: "",
    },
  });

  useEffect(() => {
    if (defaultValues) {
      form.reset({
        title: defaultValues.title,
        description: defaultValues.description,
        order: defaultValues.order.toString(),
        iconName: defaultValues.iconName || "",
      });
    }
  }, [defaultValues, form]);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start"
      >
        {/* Left Side: Icon Selection */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-4 space-y-6"
        >
          <div className="p-6 rounded-3xl bg-primary/5 border border-primary/10 flex flex-col items-center">
            <IconPickerField
              control={form.control}
              name="iconName"
              label="Visual Identity"
              className="w-full"
            />
            <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold mt-4 text-center">
              Choose an icon that best represents this service
            </p>
          </div>
        </motion.div>

        {/* Right Side: Data Fields */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-8 space-y-4"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <TextField
                control={form.control}
                name="title"
                placeholder="e.g. Executive Protection"
                label="Service Title"
              />
            </div>

            <div className="md:col-span-2">
              <TextAreaField
                control={form.control}
                name="description"
                placeholder="Provide a detailed overview of the service offerings, benefits, and specifics..."
                label="Service Description"
                rows={6}
              />
            </div>

            <div className="md:col-span-1">
              <NumericField
                control={form.control}
                name="order"
                placeholder="1"
                label="Display Priority"
              />
            </div>
          </div>

          <div className="pt-8 border-t border-primary/10 flex justify-end">
            <SubmitButton
              title={
                defaultValues ? "Apply Changes" : "Confirm & Register Service"
              }
              loading={isPending}
              className="w-full md:w-auto h-12 px-10 rounded-2xl font-bold bg-primary text-primary-foreground gold-glow hover:scale-[1.02] active:scale-[0.98] transition-all"
            />
          </div>
        </motion.div>
      </form>
    </Form>
  );
}
