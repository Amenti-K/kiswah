import { useFetch, useMutate } from "@/hooks/query.hook";
import endpoints from "@/lib/endpoints";
import { AxiosError } from "axios";
import { useToast } from "@/hooks/use-toast";
import { IResponse } from "@/components/interface/common.interface";
import { IVehicle, IVehicleCategory } from "@/components/interface/vehicle.interface";

// --- Category Hooks ---

export const useFetchCategories = () => {
  return useFetch<IResponse<IVehicleCategory[]>>(endpoints.VEHICLE_CATEGORY, {
    queryKey: ["vehicle-categories"],
  });
};

export const useFetchCategory = (id: string) => {
  return useFetch<IResponse<IVehicleCategory>>(`${endpoints.VEHICLE_CATEGORY}/${id}`, {
    queryKey: ["vehicle-category", id],
    enabled: !!id,
  });
};

export const useFetchCategoryBySlug = (slug: string) => {
  return useFetch<IResponse<IVehicleCategory>>(`${endpoints.VEHICLE_CATEGORY}/slug/${slug}`, {
    queryKey: ["vehicle-category-slug", slug],
    enabled: !!slug,
  });
};

export const useCreateCategory = () => {
  const { toast } = useToast();

  const onError = (error: AxiosError | any) => {
    toast({
      title: "Error",
      description: error?.response?.data?.message || "Creating category failed",
      variant: "destructive",
    });
  };
  const onSuccess = () => {
    toast({
      title: "Success",
      description: "Category created successfully",
    });
  };

  return useMutate(endpoints.VEHICLE_CATEGORY, "post", {
    onSuccess,
    onError,
    queryKey: ["vehicle-categories"],
  });
};

export const useUpdateCategory = () => {
  const { toast } = useToast();

  const onError = (error: AxiosError | any) => {
    toast({
      title: "Error",
      description: error?.response?.data?.message || "Updating category failed",
      variant: "destructive",
    });
  };
  const onSuccess = () => {
    toast({
      title: "Success",
      description: "Category updated successfully",
    });
  };

  return useMutate(
    (payload: any) => {
      const id = payload instanceof FormData ? payload.get("id") : payload.id;
      return `${endpoints.VEHICLE_CATEGORY}/${id}`;
    },
    "patch",
    {
      onSuccess,
      onError,
      queryKey: ["vehicle-categories", "vehicle-category"],
    },
  );
};

export const useDeleteCategory = () => {
  const { toast } = useToast();

  const onError = (error: AxiosError | any) => {
    toast({
      title: "Error",
      description: error?.response?.data?.message || "Deleting category failed",
      variant: "destructive",
    });
  };
  const onSuccess = () => {
    toast({
      title: "Success",
      description: "Category deleted successfully",
    });
  };

  return useMutate(
    (id: string) => `${endpoints.VEHICLE_CATEGORY}/${id}`,
    "delete",
    {
      onSuccess,
      onError,
      queryKey: ["vehicle-categories"],
    },
  );
};

// --- Vehicle Hooks ---

export const useFetchVehicles = (categoryId?: string) => {
  const url = categoryId ? `${endpoints.VEHICLE}?categoryId=${categoryId}` : endpoints.VEHICLE;
  return useFetch<IResponse<IVehicle[]>>(url, {
    queryKey: ["vehicles", categoryId],
  });
};

export const useFetchVehicle = (id: string) => {
  return useFetch<IResponse<IVehicle>>(`${endpoints.VEHICLE}/${id}`, {
    queryKey: ["vehicle", id],
    enabled: !!id,
  });
};

export const useCreateVehicle = () => {
  const { toast } = useToast();

  const onError = (error: AxiosError | any) => {
    toast({
      title: "Error",
      description: error?.response?.data?.message || "Creating vehicle failed",
      variant: "destructive",
    });
  };
  const onSuccess = () => {
    toast({
      title: "Success",
      description: "Vehicle created successfully",
    });
  };

  return useMutate(endpoints.VEHICLE, "post", {
    onSuccess,
    onError,
    queryKey: ["vehicles"],
  });
};

export const useUpdateVehicle = () => {
  const { toast } = useToast();

  const onError = (error: AxiosError | any) => {
    toast({
      title: "Error",
      description: error?.response?.data?.message || "Updating vehicle failed",
      variant: "destructive",
    });
  };
  const onSuccess = () => {
    toast({
      title: "Success",
      description: "Vehicle updated successfully",
    });
  };

  return useMutate(
    (payload: any) => {
      const id = payload instanceof FormData ? payload.get("id") : payload.id;
      return `${endpoints.VEHICLE}/${id}`;
    },
    "patch",
    {
      onSuccess,
      onError,
      queryKey: ["vehicles", "vehicle"],
    },
  );
};

export const useDeleteVehicle = () => {
  const { toast } = useToast();

  const onError = (error: AxiosError | any) => {
    toast({
      title: "Error",
      description: error?.response?.data?.message || "Deleting vehicle failed",
      variant: "destructive",
    });
  };
  const onSuccess = () => {
    toast({
      title: "Success",
      description: "Vehicle deleted successfully",
    });
  };

  return useMutate(
    (id: string) => `${endpoints.VEHICLE}/${id}`,
    "delete",
    {
      onSuccess,
      onError,
      queryKey: ["vehicles"],
    },
  );
};
