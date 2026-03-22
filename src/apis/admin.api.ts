import { useFetch, useMutate } from "@/hooks/query.hook";
import endpoints from "@/lib/endpoints";
import { AxiosError } from "axios";
import { useToast } from "@/hooks/use-toast";
import {
  IRegisterAdmin,
  IUpdateAdmin,
} from "@/components/interface/admin.interface";

export const useRegisterAdmin = () => {
  const { toast } = useToast();

  const onError = (error: AxiosError | any) => {
    const message = error?.response?.data?.message;
    toast({
      title: "Error",
      description: Array.isArray(message) ? message.join(", ") : message || "Failed to register admin",
      variant: "destructive",
    });
  };
  const onSuccess = (data: any) => {
    toast({
      title: "Success",
      description: data?.msg || "Admin registered successfully",
    });
  };
  return useMutate<IRegisterAdmin>(endpoints.ADMIN, "post", {
    onSuccess,
    onError,
    queryKey: ["admins"],
  });
};

export const useFetchAdmins = () => {
  return useFetch(endpoints.ADMIN, {
    queryKey: ["admins"],
  });
};

export const useUpdateAdmin = () => {
  const { toast } = useToast();

  const onError = (error: AxiosError | any) => {
    const message = error?.response?.data?.message;
    toast({
      title: "Error",
      description: Array.isArray(message) ? message.join(", ") : message || "Failed to update admin",
      variant: "destructive",
    });
  };
  const onSuccess = () => {
    toast({
      title: "Success",
      description: "Admin updated successfully",
    });
  };
  return useMutate<IUpdateAdmin>(
    (payload) => `${endpoints.ADMIN}/${payload.id}`,
    "patch",
    {
      onSuccess,
      onError,
      queryKey: ["admins"],
    },
  );
};

export const useDeleteAdmin = () => {
  const { toast } = useToast();

  const onError = (error: AxiosError | any) => {
    const message = error?.response?.data?.message;
    toast({
      title: "Error",
      description: Array.isArray(message) ? message.join(", ") : message || "Failed to delete admin",
      variant: "destructive",
    });
  };
  const onSuccess = () => {
    toast({
      title: "Success",
      description: "Admin deleted successfully",
    });
  };
  return useMutate<string>((id) => `${endpoints.ADMIN}/${id}`, "delete", {
    onSuccess,
    onError,
    queryKey: ["admins"],
  });
};
