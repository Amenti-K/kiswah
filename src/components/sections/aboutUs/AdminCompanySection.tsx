"use client";

import { useEffect, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Form, FormLabel } from "@/components/ui/form";
import {
  Plus,
  Trash2,
  Save,
  Building2,
  Mail,
  Phone,
  MapPin,
  Share2,
  AlertCircle,
  Loader2,
  CheckCircle2,
  History,
} from "lucide-react";
import { CompanySchema, CompanyType } from "@/components/schema/company.schema";
import { useFetchCompany, useUpdateCompany } from "@/apis/company.api";
import TextField from "@/components/forms/fields/TextField";
import TextAreaField from "@/components/forms/fields/TextAreaField";
import ImagePickerField from "@/components/forms/fields/ImagePickerField";
import { objectToFormData } from "@/lib/formDataHelper";
import { Separator } from "@/components/ui/separator";
import { motion, AnimatePresence } from "motion/react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export default function AdminCompanySection() {
  const { data, isLoading: isFetching } = useFetchCompany();
  const { mutate: updateCompany, isPending: isUpdating } = useUpdateCompany();

  const [showConfirm, setShowConfirm] = useState(false);
  const [pendingValues, setPendingValues] = useState<CompanyType | null>(null);

  const form = useForm<CompanyType>({
    resolver: zodResolver(CompanySchema),
    defaultValues: {
      companyName: "",
      about: "",
      logoUrl: "",
      mission: "",
      vision: "",
      emails: [""],
      phones: [""],
      address: [""],
      socialLinks: [],
    },
  });

  const { isDirty, isValid } = form.formState;

  const {
    fields: emailFields,
    append: appendEmail,
    remove: removeEmail,
  } = useFieldArray({
    control: form.control,
    name: "emails" as any,
  });

  const {
    fields: phoneFields,
    append: appendPhone,
    remove: removePhone,
  } = useFieldArray({
    control: form.control,
    name: "phones" as any,
  });

  const {
    fields: addressFields,
    append: appendAddress,
    remove: removeAddress,
  } = useFieldArray({
    control: form.control,
    name: "address" as any,
  });

  const {
    fields: socialFields,
    append: appendSocial,
    remove: removeSocial,
  } = useFieldArray({
    control: form.control,
    name: "socialLinks",
  });

  useEffect(() => {
    if (data?.data) {
      const company = data.data;
      form.reset({
        companyName: company.companyName,
        about: company.about,
        logoUrl: company.logoUrl,
        mission: company.mission || "",
        vision: company.vision || "",
        emails: company.emails.length > 0 ? company.emails : [""],
        phones: company.phones.length > 0 ? company.phones : [""],
        address: company.address.length > 0 ? company.address : [""],
        socialLinks: company.socialLinks || [],
      });
    }
  }, [data, form]);

  const handlePreSave = (values: CompanyType) => {
    setPendingValues(values);
    setShowConfirm(true);
  };

  const onConfirmSave = () => {
    if (!pendingValues) return;

    const formData = new FormData();
    Object.keys(pendingValues).forEach((key) => {
      const value = pendingValues[key as keyof CompanyType];
      if (value !== undefined && value !== null) {
        objectToFormData(formData, key, value);
      }
    });

    updateCompany(formData, {
      onSuccess: () => {
        setShowConfirm(false);
        setPendingValues(null);
        // We don't necessarily reset isDirty here if the server returns exactly what we sent,
        // but the query invalidation usually triggers a refetch which resets it via useEffect.
      },
    });
  };

  if (isFetching) {
    return (
      <div className="flex flex-col items-center justify-center py-32 gap-4">
        <Loader2 className="size-12 animate-spin text-primary/40" />
        <p className="text-muted-foreground font-medium animate-pulse">
          Syncing organizational data...
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-10">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handlePreSave)}
          className="space-y-10"
        >
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
          >
            {/* Main Content Area */}
            <div className="lg:col-span-8 space-y-8">
              {/* Identity & Core Values */}
              <motion.div variants={item}>
                <Card className="border-primary/5 bg-card/50 glass-card overflow-hidden">
                  <div className="h-1 bg-gradient-to-r from-primary/50 to-transparent" />
                  <CardHeader className="pb-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 rounded-xl bg-primary/10 text-primary">
                        <Building2 className="size-5" />
                      </div>
                      <div>
                        <CardTitle className="text-xl font-bold">
                          Brand Identity
                        </CardTitle>
                        <CardDescription>
                          Core details that define your presence
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                      <div className="space-y-6">
                        <TextField
                          control={form.control}
                          name="companyName"
                          label="Legal Business Name"
                          placeholder="e.g. Kiswah Tech Solutions"
                        />
                        <ImagePickerField
                          control={form.control}
                          name="logoUrl"
                          label="Corporate Mark / Logo"
                        />
                      </div>
                      <div className="space-y-4">
                        <TextAreaField
                          control={form.control}
                          name="about"
                          label="Corporate Biography"
                          placeholder="Craft a compelling narrative about your company's history, values, and impact..."
                          rows={11}
                        />
                      </div>
                    </div>

                    <Separator className="bg-primary/5" />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <TextAreaField
                        control={form.control}
                        name="mission"
                        label="Mission Statement"
                        placeholder="What is your purpose?"
                        rows={4}
                      />
                      <TextAreaField
                        control={form.control}
                        name="vision"
                        label="Vision Statement"
                        placeholder="Where are you going?"
                        rows={4}
                      />
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Infrastructure & Global Connectivity */}
              <motion.div variants={item}>
                <Card className="border-primary/5 bg-card/50 glass-card overflow-hidden">
                  <div className="h-1 bg-gradient-to-r from-primary/50 to-transparent" />
                  <CardHeader className="pb-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 rounded-xl bg-primary/10 text-primary">
                        <Share2 className="size-5" />
                      </div>
                      <div>
                        <CardTitle className="text-xl font-bold">
                          Connectivity Hub
                        </CardTitle>
                        <CardDescription>
                          Manage how clients and partners reach you
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-8">
                    {/* Contacts Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                      {/* Left: Digital & Voice */}
                      <div className="space-y-8">
                        {/* Emails */}
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <FormLabel className="flex items-center gap-2 text-foreground/80">
                              <Mail className="size-4" /> Professional Emails
                            </FormLabel>
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              className="h-8 text-primary hover:bg-primary/5"
                              onClick={() => appendEmail("")}
                            >
                              <Plus className="h-3.5 w-3.5 mr-1" /> Add
                            </Button>
                          </div>
                          <div className="space-y-3">
                            {emailFields.map((field, index) => (
                              <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                key={field.id}
                                className="flex gap-2 group"
                              >
                                <div className="flex-1">
                                  <TextField
                                    control={form.control}
                                    name={`emails.${index}`}
                                    placeholder="contact@company.com"
                                  />
                                </div>
                                <Button
                                  type="button"
                                  variant="ghost"
                                  size="icon"
                                  className="h-10 w-10 text-destructive/40 hover:text-destructive hover:bg-destructive/5 opacity-0 group-hover:opacity-100 transition-all"
                                  onClick={() => removeEmail(index)}
                                  disabled={emailFields.length === 1}
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </motion.div>
                            ))}
                          </div>
                        </div>

                        {/* Phones */}
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <FormLabel className="flex items-center gap-2 text-foreground/80">
                              <Phone className="size-4" /> Contact Numbers
                            </FormLabel>
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              className="h-8 text-primary hover:bg-primary/5"
                              onClick={() => appendPhone("")}
                            >
                              <Plus className="h-3.5 w-3.5 mr-1" /> Add
                            </Button>
                          </div>
                          <div className="space-y-3">
                            {phoneFields.map((field, index) => (
                              <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                key={field.id}
                                className="flex gap-2 group"
                              >
                                <div className="flex-1">
                                  <TextField
                                    control={form.control}
                                    name={`phones.${index}`}
                                    placeholder="+251 900 000 000"
                                  />
                                </div>
                                <Button
                                  type="button"
                                  variant="ghost"
                                  size="icon"
                                  className="h-10 w-10 text-destructive/40 hover:text-destructive hover:bg-destructive/5 opacity-0 group-hover:opacity-100 transition-all"
                                  onClick={() => removePhone(index)}
                                  disabled={phoneFields.length === 1}
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </motion.div>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Right: Physical Infrastructure */}
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <FormLabel className="flex items-center gap-2 text-foreground/80">
                            <MapPin className="size-4" /> Office Locations
                          </FormLabel>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="h-8 text-primary hover:bg-primary/5"
                            onClick={() => appendAddress("")}
                          >
                            <Plus className="h-3.5 w-3.5 mr-1" /> Add
                          </Button>
                        </div>
                        <div className="space-y-3">
                          {addressFields.map((field, index) => (
                            <motion.div
                              initial={{ opacity: 0, scale: 0.95 }}
                              animate={{ opacity: 1, scale: 1 }}
                              key={field.id}
                              className="flex gap-2 group"
                            >
                              <div className="flex-1">
                                <TextField
                                  control={form.control}
                                  name={`address.${index}`}
                                  placeholder="Street, City, Country"
                                />
                              </div>
                              <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                className="h-10 w-10 text-destructive/40 hover:text-destructive hover:bg-destructive/5 opacity-0 group-hover:opacity-100 transition-all"
                                onClick={() => removeAddress(index)}
                                disabled={addressFields.length === 1}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <Separator className="bg-primary/5" />

                    {/* Social Network Grid */}
                    <div className="space-y-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <FormLabel className="text-base font-bold text-foreground">
                            Social Ecosystem
                          </FormLabel>
                          <p className="text-xs text-muted-foreground mt-0.5">
                            External platform integration
                          </p>
                        </div>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          className="rounded-xl border-primary/20 hover:bg-primary/5 text-primary"
                          onClick={() =>
                            appendSocial({ platform: "", url: "" })
                          }
                        >
                          <Plus className="h-4 w-4 mr-1" /> Append Platform
                        </Button>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <AnimatePresence mode="popLayout">
                          {socialFields.map((field, index) => (
                            <motion.div
                              layout
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, scale: 0.9 }}
                              key={field.id}
                              className="p-5 rounded-[1.5rem] bg-background/50 border border-primary/5 group relative transition-all hover:bg-primary/2"
                            >
                              <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                className="absolute top-3 right-3 text-destructive/40 hover:text-destructive hover:bg-destructive/5 opacity-0 group-hover:opacity-100 transition-all rounded-full h-8 w-8"
                                onClick={() => removeSocial(index)}
                              >
                                <Trash2 className="size-3.5" />
                              </Button>
                              <div className="space-y-4 pt-2">
                                <TextField
                                  control={form.control}
                                  name={`socialLinks.${index}.platform`}
                                  label="Platform"
                                  placeholder="e.g. LinkedIn"
                                />
                                <TextField
                                  control={form.control}
                                  name={`socialLinks.${index}.url`}
                                  label="Direct URL"
                                  placeholder="https://..."
                                />
                              </div>
                            </motion.div>
                          ))}
                        </AnimatePresence>
                      </div>
                      {socialFields.length === 0 && (
                        <div className="text-center py-10 border-2 border-dashed border-primary/5 rounded-[2rem] text-muted-foreground/50 italic text-sm">
                          No digital footprints registered.
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            {/* Sidebar Controls */}
            <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-24">
              <motion.div variants={item}>
                <Card className="border-primary/10 bg-card glass-card shadow-2xl overflow-hidden">
                  <CardHeader className="pb-4">
                    <CardTitle className="text-lg font-bold flex items-center gap-2">
                      <Save className="size-4 text-primary" /> System Controls
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="p-4 rounded-xl bg-primary/5 border border-primary/10 space-y-3">
                      <div className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-widest">
                        <History className="size-3.5" /> Revision History
                      </div>
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        Last modification committed on:
                        <span className="block font-bold text-foreground mt-1">
                          {data?.data?.updatedAt
                            ? new Date(data.data.updatedAt).toLocaleDateString(
                                undefined,
                                {
                                  dateStyle: "full",
                                },
                              )
                            : "System Initialized"}
                        </span>
                      </p>
                    </div>

                    <div className="space-y-3">
                      <Button
                        type="submit"
                        className={`w-full h-14 rounded-2xl font-bold transition-all duration-300 ${isDirty ? "bg-primary text-primary-foreground gold-glow hover:scale-[1.02]" : "bg-muted text-muted-foreground opacity-50"}`}
                        disabled={isUpdating || !isDirty}
                      >
                        {isUpdating ? (
                          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        ) : (
                          <Save className="mr-2 h-5 w-5" />
                        )}
                        Commit Organizational Changes
                      </Button>

                      {!isDirty && (
                        <p className="text-[10px] text-center text-muted-foreground/60 px-4">
                          Form is currently in sync with server. Modify fields
                          to enable commit actions.
                        </p>
                      )}
                    </div>

                    <Separator className="bg-primary/5" />

                    <div className="flex items-center gap-2 p-3 rounded-xl bg-card border border-primary/5 text-[10px]">
                      <div
                        className={`p-1 rounded-full ${isValid ? "bg-emerald-500/20 text-emerald-500" : "bg-amber-500/20 text-amber-500"}`}
                      >
                        {isValid ? (
                          <CheckCircle2 className="size-3" />
                        ) : (
                          <AlertCircle className="size-3" />
                        )}
                      </div>
                      <span className="font-bold text-muted-foreground uppercase tracking-widest">
                        {isValid
                          ? "Data integrity verified"
                          : "Awaiting valid inputs"}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div variants={item} className="p-6 text-center">
                <p className="text-[10px] text-muted-foreground/40 font-bold uppercase tracking-[0.3em]">
                  Kiswah Admin Protocol v2.4
                </p>
              </motion.div>
            </div>
          </motion.div>
        </form>
      </Form>

      {/* Confirmation Dialog */}
      <Dialog open={showConfirm} onOpenChange={setShowConfirm}>
        <DialogContent className="max-w-md rounded-[2.5rem] bg-card border-white/10 glass-card p-0 overflow-hidden">
          <div className="h-1.5 bg-gradient-to-r from-primary to-transparent w-full" />
          <div className="p-8">
            <DialogHeader>
              <div className="flex justify-center mb-6">
                <div className="p-4 rounded-3xl bg-primary/10 text-primary border border-primary/20">
                  <AlertCircle className="size-10" />
                </div>
              </div>
              <DialogTitle className="text-center text-2xl font-bold">
                Synchronize Profile?
              </DialogTitle>
              <DialogDescription className="text-center text-muted-foreground text-base mt-2">
                You are about to commit core organizational updates. These
                changes will be propagated to the public ecosystem instantly.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter className="flex flex-col sm:flex-row gap-3 pt-8">
              <Button
                variant="outline"
                onClick={() => setShowConfirm(false)}
                className="h-12 flex-1 rounded-2xl border-primary/10 hover:bg-primary/5 font-bold"
              >
                Back to Review
              </Button>
              <Button
                onClick={onConfirmSave}
                className="h-12 flex-1 rounded-2xl bg-primary text-primary-foreground gold-glow font-bold hover:scale-[1.02] active:scale-[0.98] transition-all"
              >
                Commit Changes
              </Button>
            </DialogFooter>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
