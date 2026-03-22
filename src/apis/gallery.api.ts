import { useFetch, useInfiniteFetch, useMutate } from "@/hooks/query.hook";
import endpoints from "@/lib/endpoints";
import { AxiosError } from "axios";
import { useToast } from "@/hooks/use-toast";
import { IResponse } from "@/components/interface/common.interface";
import { IGallery } from "@/components/interface/gallery.interface";

// === TOOLS API HOOKS ===

export const useFetchTools = () => {
  return useFetch(endpoints.TOOLS, { queryKey: ["tools"] });
};

export const useCreateTool = () => {
  const { toast } = useToast();

  const onError = (error: AxiosError | any) => {
    toast({
      title: "Error",
      description: error?.response?.data?.message || "Creating tool failed",
      variant: "destructive",
    });
  };
  const onSuccess = () => {
    toast({
      title: "Success",
      description: "Tool created successfully",
    });
  };

  return useMutate(endpoints.TOOLS, "post", {
    onSuccess,
    onError,
    queryKey: ["tools"],
  });
};

export const useUpdateTool = () => {
  const { toast } = useToast();

  const onError = (error: AxiosError | any) => {
    toast({
      title: "Error",
      description: error?.response?.data?.message || "Updating tool failed",
      variant: "destructive",
    });
  };
  const onSuccess = () => {
    toast({
      title: "Success",
      description: "Tool updated successfully",
    });
  };

  return useMutate(
    (payload: any) => {
      const id = payload instanceof FormData ? payload.get("id") : payload.id;
      return `${endpoints.TOOLS}/${id}`;
    },
    "patch",
    {
      onSuccess,
      onError,
      queryKey: ["tools"],
    },
  );
};

export const useDeleteTool = () => {
  const { toast } = useToast();

  const onError = (error: AxiosError | any) => {
    toast({
      title: "Error",
      description: error?.response?.data?.message || "Deleting tool failed",
      variant: "destructive",
    });
  };
  const onSuccess = () => {
    toast({
      title: "Success",
      description: "Tool deleted successfully",
    });
  };

  return useMutate(
    (payload: any) => {
      const id = typeof payload === "string" ? payload : payload?.id;
      return `${endpoints.TOOLS}/${id}`;
    },
    "delete",
    {
      onSuccess,
      onError,
      queryKey: ["tools"],
    },
  );
};

// === GALLERY API HOOKS ===

export const useFetchGallery = (params?: Record<string, any>) => {
  return useInfiniteFetch<IResponse<Array<IGallery>>>(endpoints.GALLERY, {
    queryKey: ["gallery", params],
    params,
  });
};

export const useCreateGallery = () => {
  const { toast } = useToast();

  const onError = (error: AxiosError | any) => {
    toast({
      title: "Error",
      description:
        error?.response?.data?.message || "Creating gallery images failed",
      variant: "destructive",
    });
  };
  const onSuccess = () => {
    toast({
      title: "Success",
      description: "Gallery images uploaded successfully",
    });
  };

  return useMutate(endpoints.GALLERY, "post", {
    onSuccess,
    onError,
    queryKey: ["gallery"],
  });
};

export const useDeleteGallery = () => {
  const { toast } = useToast();

  const onError = (error: AxiosError | any) => {
    toast({
      title: "Error",
      description:
        error?.response?.data?.message || "Deleting gallery image failed",
      variant: "destructive",
    });
  };
  const onSuccess = () => {
    toast({
      title: "Success",
      description: "Gallery image deleted successfully",
    });
  };

  return useMutate(
    (payload: any) => {
      const id = typeof payload === "string" ? payload : payload?.id;
      return `${endpoints.GALLERY}/${id}`;
    },
    "delete",
    {
      onSuccess,
      onError,
      queryKey: ["gallery"],
    },
  );
};
