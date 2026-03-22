"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "motion/react";
import {
  UserPlus,
  ShieldCheck,
  Phone,
  User,
  CheckCircle2,
  Copy,
  RefreshCcw,
  LayoutDashboard,
  Trash2,
  Edit2,
  Activity,
} from "lucide-react";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  useRegisterAdmin,
  useFetchAdmins,
  useUpdateAdmin,
  useDeleteAdmin,
} from "@/apis/admin.api";
import { RegisterInput, registerSchema } from "@/components/schema/auth.schema";
import TextField from "@/components/forms/fields/TextField";
import SwitchField from "@/components/forms/fields/SwitchField";
import SubmitButton from "@/components/forms/fields/SubmitButton";
import { IAdmin } from "@/components/interface/admin.interface";
import { Badge } from "@/components/ui/badge";

const RegisterAdmin = () => {
  const [successData, setSuccessData] = useState<RegisterInput | null>(null);
  const [editingAdmin, setEditingAdmin] = useState<IAdmin | null>(null);

  const { mutate: register, isPending: isRegistering } = useRegisterAdmin();
  const { data: adminsResponse, isLoading: isFetchingAdmins } =
    useFetchAdmins();
  const { mutate: updateAdmin, isPending: isUpdating } = useUpdateAdmin();
  const { mutate: deleteAdmin } = useDeleteAdmin();

  const admins: IAdmin[] = adminsResponse?.data || [];

  const { control, handleSubmit, reset, setValue } = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      phoneNumber: "",
      password: "",
      isSuper: false,
    },
  });

  useEffect(() => {
    if (editingAdmin) {
      setValue("name", editingAdmin.name);
      setValue("phoneNumber", editingAdmin.phoneNumber);
      setValue("isSuper", editingAdmin.isSuper);
      setValue("password", ""); // Keep empty for update unless changing
    } else {
      reset({
        name: "",
        phoneNumber: "",
        password: "",
        isSuper: false,
      });
    }
  }, [editingAdmin, setValue, reset]);

  const onSubmit = (data: RegisterInput) => {
    if (editingAdmin) {
      const updateData: any = { ...data, id: editingAdmin.id };
      if (!data.password) delete updateData.password;

      updateAdmin(updateData, {
        onSuccess: () => {
          setEditingAdmin(null);
          reset();
        },
      });
    } else {
      register(data, {
        onSuccess: () => {
          setSuccessData(data);
          reset();
        },
      });
    }
  };

  const handleCopyCredentials = () => {
    if (!successData) return;

    const credentials = `
Name: ${successData.name}
Phone: ${successData.phoneNumber}
Password: ${successData.password}
Role: ${successData.isSuper ? "Super Admin" : "Admin"}
    `.trim();

    navigator.clipboard.writeText(credentials);
  };

  const handleReset = () => {
    setSuccessData(null);
    setEditingAdmin(null);
    reset();
  };

  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to delete this administrator?")) {
      deleteAdmin(id);
    }
  };

  return (
    <div className="container mx-auto px-2 pb-8 min-h-screen">
      <div className="flex flex-col lg:flex-row gap-4 items-start">
        {/* Left Column: Admin List */}
        <div className="w-full lg:w-2/3 space-y-8">
          <div className="space-y-2">
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-xs font-black uppercase tracking-[0.4em] text-primary"
            >
              System Management
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl font-bold tracking-tight text-foreground"
            >
              Administrator{" "}
              <span className="text-primary italic">Directory</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="text-muted-foreground text-lg max-w-2xl"
            >
              View and manage and update system administrators and their access
              levels.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <AnimatePresence mode="popLayout">
              {isFetchingAdmins ? (
                [1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="h-48 rounded-[2.5rem] bg-card/40 animate-pulse border border-primary/5"
                  />
                ))
              ) : admins.length === 0 ? (
                <div className="col-span-full py-20 text-center glass-card rounded-[2.5rem] border-dashed border-2 border-primary/10">
                  <User className="w-12 h-12 mx-auto mb-4 opacity-20" />
                  <p className="text-muted-foreground">
                    No administrators found.
                  </p>
                </div>
              ) : (
                admins.map((admin, index) => (
                  <motion.div
                    key={admin.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Card className="glass-card border-primary/10 hover:border-primary/40 transition-all duration-500 rounded-[2.5rem] group overflow-hidden h-full">
                      <CardHeader className="flex flex-row items-start justify-between pb-2">
                        <div className="p-3 rounded-2xl bg-primary/5 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-500">
                          <User className="w-6 h-6" />
                        </div>
                        <div className="flex gap-1">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="rounded-xl hover:bg-primary/10 text-primary"
                            onClick={() => setEditingAdmin(admin)}
                          >
                            <Edit2 className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="rounded-xl hover:bg-destructive/10 text-destructive"
                            onClick={() => handleDelete(admin.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div>
                          <h3 className="text-xl font-bold tracking-tight truncate">
                            {admin.name}
                          </h3>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                            <Phone className="w-3.5 h-3.5" />
                            {admin.phoneNumber}
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-2 pt-2">
                          <Badge
                            variant={admin.isSuper ? "default" : "secondary"}
                            className="rounded-lg font-bold uppercase text-[10px] tracking-wider"
                          >
                            {admin.isSuper ? "Super Admin" : "Admin"}
                          </Badge>
                          {admin.isActive && (
                            <Badge
                              variant="outline"
                              className="rounded-lg bg-green-500/10 text-green-600 border-green-500/20 font-bold uppercase text-[10px] tracking-wider flex items-center gap-1"
                            >
                              <Activity className="w-3 h-3" />
                              Active
                            </Badge>
                          )}
                        </div>
                      </CardContent>
                      <div className="absolute bottom-0 left-0 w-full h-1 bg-primary/10 group-hover:bg-primary/40 transition-all duration-700" />
                    </Card>
                  </motion.div>
                ))
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Right Column: Sticky Form */}
        <div className="w-full lg:w-1/3 sticky top-24">
          <AnimatePresence mode="wait">
            {successData ? (
              <motion.div
                key="success-card"
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -20 }}
                className="w-full"
              >
                <Card className="border-primary/20 shadow-2xl shadow-primary/10 overflow-hidden bg-card/60 backdrop-blur-xl rounded-[2.5rem] border-t-8 border-t-green-500/50">
                  <CardHeader className="pt-8 pb-4 text-center space-y-4">
                    <div className="mx-auto w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center mb-2 border border-green-500/20">
                      <CheckCircle2 className="w-8 h-8 text-green-500" />
                    </div>
                    <div>
                      <CardTitle className="text-2xl font-bold tracking-tight text-green-600 dark:text-green-400">
                        Created!
                      </CardTitle>
                      <CardDescription className="text-sm px-4">
                        Admin account for{" "}
                        <span className="font-bold text-foreground">
                          {successData.name}
                        </span>{" "}
                        is ready.
                      </CardDescription>
                    </div>
                  </CardHeader>

                  <CardContent className="px-8 pb-8 space-y-6">
                    <div className="p-5 rounded-[2rem] bg-background/80 border border-primary/10 space-y-4">
                      <div className="flex flex-col gap-1">
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary/60">
                          Phone Number
                        </span>
                        <span className="text-base font-medium">
                          {successData.phoneNumber}
                        </span>
                      </div>
                      <div className="flex flex-col gap-1">
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary/60">
                          Temporary Password
                        </span>
                        <span className="text-base font-mono font-bold tracking-widest bg-primary/5 px-2 py-1 rounded-lg w-fit">
                          {successData.password}
                        </span>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <Button
                        onClick={handleCopyCredentials}
                        className="h-12 rounded-2xl w-full text-base font-bold shadow-lg shadow-primary/20 gap-3 group"
                      >
                        <Copy className="w-4 h-4 group-active:scale-90 transition-transform" />
                        Copy Credentials
                      </Button>
                      <div className="grid grid-cols-2 gap-3">
                        <Button
                          variant="outline"
                          onClick={handleReset}
                          className="h-10 rounded-xl border-primary/10 hover:bg-primary/5 gap-2 text-xs"
                        >
                          <RefreshCcw className="w-3.5 h-3.5" />
                          Register New
                        </Button>
                        <Button
                          variant="secondary"
                          className="h-10 rounded-xl bg-primary/10 hover:bg-primary/20 gap-2 text-xs"
                        >
                          <LayoutDashboard className="w-3.5 h-3.5" />
                          Dashboard
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ) : (
              <motion.div
                key="register-form"
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -20 }}
                className="w-full"
              >
                <Card className="border-primary/20 shadow-2xl shadow-primary/10 overflow-hidden bg-card/60 backdrop-blur-xl rounded-[2.5rem]">
                  <CardHeader className="pt-10 pb-6 text-center space-y-3">
                    <div className="mx-auto w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-2">
                      {editingAdmin ? (
                        <Edit2 className="w-6 h-6 text-primary" />
                      ) : (
                        <UserPlus className="w-6 h-6 text-primary" />
                      )}
                    </div>
                    <div className="space-y-1">
                      <CardTitle className="text-2xl font-bold tracking-tight">
                        {editingAdmin ? "Update" : "Register"}{" "}
                        <span className="text-primary italic">Admin</span>
                      </CardTitle>
                      <CardDescription className="text-sm">
                        {editingAdmin
                          ? "Modify administrator details."
                          : "Enter details for the new administrator."}
                      </CardDescription>
                    </div>
                  </CardHeader>

                  <CardContent className="px-8 pb-10">
                    <form
                      onSubmit={handleSubmit(onSubmit)}
                      className="space-y-5"
                    >
                      <div className="space-y-4">
                        <div className="relative">
                          <TextField
                            name="name"
                            label="Full Name"
                            control={control}
                            placeholder="Full Name"
                          />
                          <User className="absolute right-4 top-[32px] w-4 h-4 text-muted-foreground/40" />
                        </div>

                        <div className="relative">
                          <TextField
                            name="phoneNumber"
                            label="Phone Number"
                            control={control}
                            placeholder="0911..."
                            type="tel"
                          />
                          <Phone className="absolute right-4 top-[32px] w-4 h-4 text-muted-foreground/40" />
                        </div>

                        <div className="relative">
                          <TextField
                            name="password"
                            label={
                              editingAdmin
                                ? "New Password (Optional)"
                                : "Temporary Password"
                            }
                            control={control}
                            placeholder="••••••••"
                            secureTextEntry={true}
                          />
                        </div>

                        <div className="p-4 rounded-2xl bg-primary/5 border border-primary/10 flex items-center justify-between">
                          <div className="space-y-0.5">
                            <label className="text-xs font-bold flex items-center gap-2">
                              <ShieldCheck className="w-3.5 h-3.5 text-primary" />
                              Super Admin
                            </label>
                            <p className="text-[10px] text-muted-foreground">
                              Grant privileged access.
                            </p>
                          </div>
                          <SwitchField name="isSuper" control={control} />
                        </div>
                      </div>

                      <div className="pt-4 flex flex-col gap-3">
                        <SubmitButton
                          title={
                            editingAdmin
                              ? "Update Administrator"
                              : "Register Administrator"
                          }
                          loading={isRegistering || isUpdating}
                          className="w-full h-12 rounded-2xl text-base font-bold shadow-lg shadow-primary/20"
                        />
                        {editingAdmin && (
                          <Button
                            type="button"
                            variant="ghost"
                            onClick={() => setEditingAdmin(null)}
                            className="w-full rounded-xl"
                          >
                            Cancel Edit
                          </Button>
                        )}
                      </div>
                    </form>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default RegisterAdmin;
