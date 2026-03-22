import { useFetch, useInfiniteFetch, useMutate } from "@/hooks/query.hook";
import endpoints from "@/lib/endpoints";
import { AxiosError } from "axios";
import { useToast } from "@/hooks/use-toast";

// Fetch News with pagination
export const useFetchNews = (params?: Record<string, any>) => {
  // Add params to the queryKey so it refetches when they change
  return useInfiniteFetch(endpoints.NEWS, {
    queryKey: ["news", params],
    params,
  });
};

export const useCreateNews = () => {
  const { toast } = useToast();

  const onError = (error: AxiosError | any) => {
    const message = error?.response?.data?.message;
    toast({
      title: "Error",
      description: Array.isArray(message) ? message.join(", ") : message || "Creating news failed",
      variant: "destructive",
    });
  };
  const onSuccess = () => {
    toast({
      title: "Success",
      description: "News created successfully",
    });
  };

  return useMutate(endpoints.NEWS, "post", {
    onSuccess,
    onError,
    queryKey: ["news"],
  });
};

export const useUpdateNews = () => {
  const { toast } = useToast();

  const onError = (error: AxiosError | any) => {
    const message = error?.response?.data?.message;
    toast({
      title: "Error",
      description: Array.isArray(message) ? message.join(", ") : message || "Updating news failed",
      variant: "destructive",
    });
  };
  const onSuccess = () => {
    toast({
      title: "Success",
      description: "News updated successfully",
    });
  };

  return useMutate(
    (payload: any) => {
      const id = payload instanceof FormData ? payload.get("id") : payload.id;
      return `${endpoints.NEWS}/${id}`;
    },
    "patch",
    {
      onSuccess,
      onError,
      queryKey: ["news"],
    },
  );
};

export const useDeleteNews = () => {
  const { toast } = useToast();

  const onError = (error: AxiosError | any) => {
    const message = error?.response?.data?.message;
    toast({
      title: "Error",
      description: Array.isArray(message) ? message.join(", ") : message || "Deleting news failed",
      variant: "destructive",
    });
  };
  const onSuccess = () => {
    toast({
      title: "Success",
      description: "News deleted successfully",
    });
  };

  return useMutate(
    (payload: any) => {
      const id = typeof payload === "string" ? payload : payload?.id;
      return `${endpoints.NEWS}/${id}`;
    },
    "delete",
    {
      onSuccess,
      onError,
      queryKey: ["news"],
    },
  );
};
