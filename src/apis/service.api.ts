import { useFetch, useMutate } from "@/hooks/query.hook";
import endpoints from "@/lib/endpoints";
import { AxiosError } from "axios";
import { useToast } from "@/hooks/use-toast";
import { IResponse } from "@/components/interface/common.interface";
import { IProcess, IService } from "@/components/interface/service.interface";

// Services
export const useFetchServices = () => {
  return useFetch(endpoints.SERVICE, {
    queryKey: ["services"],
  });
};

export const useCreateService = () => {
  const { toast } = useToast();

  const onError = (error: AxiosError | any) => {
    toast({
      title: "Error",
      description: error?.response?.data?.message || "Creating service failed",
      variant: "destructive",
    });
  };
  const onSuccess = () => {
    toast({
      title: "Success",
      description: "Service created successfully",
    });
  };

  return useMutate(endpoints.SERVICE, "post", {
    onSuccess,
    onError,
    queryKey: ["services"],
  });
};

export const useUpdateService = () => {
  const { toast } = useToast();

  const onError = (error: AxiosError | any) => {
    toast({
      title: "Error",
      description: error?.response?.data?.message || "Updating service failed",
      variant: "destructive",
    });
  };
  const onSuccess = () => {
    toast({
      title: "Success",
      description: "Service updated successfully",
    });
  };

  return useMutate(
    (payload: any) => {
      const id = payload instanceof FormData ? payload.get("id") : payload.id;
      return `${endpoints.SERVICE}/${id}`;
    },
    "patch",
    {
      onSuccess,
      onError,
      queryKey: ["services"],
    },
  );
};

export const useDeleteService = () => {
  const { toast } = useToast();

  const onError = (error: AxiosError | any) => {
    toast({
      title: "Error",
      description: error?.response?.data?.message || "Deleting services failed",
      variant: "destructive",
    });
  };
  const onSuccess = () => {
    toast({
      title: "Success",
      description: "Services deleted successfully",
    });
  };

  return useMutate(
    (payload: any) => {
      const id = typeof payload === "string" ? payload : payload?.id;
      return `${endpoints.SERVICE}/${id}`;
    },
    "delete",
    {
      onSuccess,
      onError,
      queryKey: ["services"],
    },
  );
};

// Process
export const useFetchProcess = () => {
  return useFetch<IResponse<IProcess[]>>(endpoints.PROCESS, {
    queryKey: ["process"],
  });
};

export const useCreateProcess = () => {
  const { toast } = useToast();

  const onError = (error: AxiosError | any) => {
    toast({
      title: "Error",
      description: error?.response?.data?.message || "Creating process failed",
      variant: "destructive",
    });
  };
  const onSuccess = () => {
    toast({
      title: "Success",
      description: "Process created successfully",
    });
  };

  return useMutate(endpoints.PROCESS, "post", {
    onSuccess,
    onError,
    queryKey: ["process"],
  });
};

export const useUpdateProcess = () => {
  const { toast } = useToast();

  const onError = (error: AxiosError | any) => {
    toast({
      title: "Error",
      description: error?.response?.data?.message || "Updating process failed",
      variant: "destructive",
    });
  };
  const onSuccess = () => {
    toast({
      title: "Success",
      description: "Process updated successfully",
    });
  };

  return useMutate(
    (payload: Partial<IProcess>) => `${endpoints.PROCESS}/${payload.id}`,
    "patch",
    {
      onSuccess,
      onError,
      queryKey: ["process"],
    },
  );
};

export const useDeleteProcess = () => {
  const { toast } = useToast();

  const onError = (error: AxiosError | any) => {
    toast({
      title: "Error",
      description: error?.response?.data?.message || "Deleting process failed",
      variant: "destructive",
    });
  };
  const onSuccess = () => {
    toast({
      title: "Success",
      description: "Process deleted successfully",
    });
  };

  return useMutate((id: string) => `${endpoints.PROCESS}/${id}`, "delete", {
    onSuccess,
    onError,
    queryKey: ["process"],
  });
};
