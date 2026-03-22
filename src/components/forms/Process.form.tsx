"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { processSchema, ProcessType } from "@/components/schema/service.schema";
import { Form } from "@/components/ui/form";
import { useEffect } from "react";
import { IProcess } from "@/components/interface/service.interface";
import TextField from "./fields/TextField";
import TextAreaField from "./fields/TextAreaField";
import NumericField from "./fields/NumericField";
import SubmitButton from "./fields/SubmitButton";
import { motion } from "motion/react";

interface ProcessFormProps {
  defaultValues?: IProcess;
  onSubmit: (data: ProcessType) => void;
  isPending: boolean;
}

export default function ProcessForm({
  defaultValues,
  onSubmit,
  isPending,
}: ProcessFormProps) {
  const form = useForm<ProcessType>({
    resolver: zodResolver(processSchema),
    defaultValues: {
      title: "",
      description: "",
      order: "1",
    },
  });

  useEffect(() => {
    if (defaultValues) {
      form.reset({
        title: defaultValues.title,
        description: defaultValues.description,
        order: defaultValues.order.toString(),
      });
    }
  }, [defaultValues, form]);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:col-span-2"
        >
          <TextField
            control={form.control}
            name="title"
            placeholder="e.g. Needs Assessment & Strategy"
            label="Step Title"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="md:col-span-1"
        >
          <NumericField
            control={form.control}
            name="order"
            placeholder="1"
            label="Sequence Position"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="md:col-span-2"
        >
          <TextAreaField
            control={form.control}
            name="description"
            placeholder="Outline the key activities and objectives for this stage..."
            label="Detailed Description"
            rows={4}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="md:col-span-2 pt-6 border-t border-primary/10 flex justify-end"
        >
          <SubmitButton
            title={
              defaultValues ? "Update Sequence Step" : "Integrate into Workflow"
            }
            loading={isPending}
            className="w-full md:w-auto h-12 px-8 rounded-2xl font-bold bg-primary text-primary-foreground gold-glow hover:scale-[1.02] active:scale-[0.98] transition-all"
          />
        </motion.div>
      </form>
    </Form>
  );
}
