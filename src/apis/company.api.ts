import { useFetch, useMutate } from "@/hooks/query.hook";
import endpoints from "@/lib/endpoints";
import { AxiosError } from "axios";
import { useToast } from "@/hooks/use-toast";
import { IResponse } from "@/components/interface/common.interface";
import { ICompany, ITeam, IStaff } from "@/components/interface/company.interface";

// Company (Singleton)
export const useFetchCompany = () => {
  return useFetch<IResponse<ICompany>>(endpoints.COMPANY, {
    queryKey: ["company"],
  });
};

export const useUpdateCompany = () => {
  const { toast } = useToast();

  const onError = (error: AxiosError | any) => {
    toast({
      title: "Error",
      description: error?.response?.data?.message || "Updating company failed",
      variant: "destructive",
    });
  };
  const onSuccess = () => {
    toast({
      title: "Success",
      description: "Company updated successfully",
    });
  };

  return useMutate(endpoints.COMPANY, "patch", {
    onSuccess,
    onError,
    queryKey: ["company"],
  });
};

// --- Team Operations (Bulk/Nested) ---

export const useFetchTeams = () => {
  return useFetch<IResponse<ITeam[]>>(`${endpoints.STAFF}/team`, {
    queryKey: ["teams"],
  });
};

export const useCreateTeam = () => {
  const { toast } = useToast();

  const onError = (error: AxiosError | any) => {
    toast({
      title: "Error",
      description: error?.response?.data?.message || "Creating team failed",
      variant: "destructive",
    });
  };
  const onSuccess = () => {
    toast({
      title: "Success",
      description: "Team created successfully",
    });
  };

  return useMutate(`${endpoints.STAFF}/team`, "post", {
    onSuccess,
    onError,
    queryKey: ["teams"],
  });
};

export const useUpdateTeam = () => {
  const { toast } = useToast();

  const onError = (error: AxiosError | any) => {
    toast({
      title: "Error",
      description: error?.response?.data?.message || "Updating team failed",
      variant: "destructive",
    });
  };
  const onSuccess = () => {
    toast({
      title: "Success",
      description: "Team updated successfully",
    });
  };

  return useMutate(
    (payload: any) => `${endpoints.STAFF}/team/${payload.id}`,
    "patch",
    {
      onSuccess,
      onError,
      queryKey: ["teams"],
    },
  );
};

export const useDeleteTeam = () => {
  const { toast } = useToast();

  const onError = (error: AxiosError | any) => {
    toast({
      title: "Error",
      description: error?.response?.data?.message || "Deleting team failed",
      variant: "destructive",
    });
  };
  const onSuccess = () => {
    toast({
      title: "Success",
      description: "Team deleted successfully",
    });
  };

  return useMutate(
    (id: string) => `${endpoints.STAFF}/team/${id}`,
    "delete",
    {
      onSuccess,
      onError,
      queryKey: ["teams"],
    },
  );
};

// --- Staff Member Operations (Individual) ---

export const useCreateStaff = () => {
  const { toast } = useToast();

  const onError = (error: AxiosError | any) => {
    toast({
      title: "Error",
      description: error?.response?.data?.message || "Creating staff member failed",
      variant: "destructive",
    });
  };
  const onSuccess = () => {
    toast({
      title: "Success",
      description: "Staff member created successfully",
    });
  };

  return useMutate(`${endpoints.STAFF}/member`, "post", {
    onSuccess,
    onError,
    queryKey: ["teams"], // Refresh teams to show new member in lists
  });
};

export const useUpdateStaff = () => {
  const { toast } = useToast();

  const onError = (error: AxiosError | any) => {
    toast({
      title: "Error",
      description: error?.response?.data?.message || "Updating staff member failed",
      variant: "destructive",
    });
  };
  const onSuccess = () => {
    toast({
      title: "Success",
      description: "Staff member updated successfully",
    });
  };

  return useMutate(
    (payload: any) => {
      const id = payload instanceof FormData ? payload.get("id") : payload.id;
      return `${endpoints.STAFF}/member/${id}`;
    },
    "patch",
    {
      onSuccess,
      onError,
      queryKey: ["teams"],
    },
  );
};

export const useDeleteStaff = () => {
  const { toast } = useToast();

  const onError = (error: AxiosError | any) => {
    toast({
      title: "Error",
      description: error?.response?.data?.message || "Deleting staff member failed",
      variant: "destructive",
    });
  };
  const onSuccess = () => {
    toast({
      title: "Success",
      description: "Staff member deleted successfully",
    });
  };

  return useMutate(
    (id: string) => `${endpoints.STAFF}/member/${id}`,
    "delete",
    {
      onSuccess,
      onError,
      queryKey: ["teams"],
    },
  );
};
