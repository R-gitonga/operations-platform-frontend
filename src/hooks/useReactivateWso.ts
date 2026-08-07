import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { reactivateWso as reactivateWsoApi } from "@/api/wso";

type ReactivateWsoParams = {
  wsoId: string | number;
};

async function reactivateWso({ wsoId }: ReactivateWsoParams) {
  const { data } = await reactivateWsoApi(Number(wsoId));
  return data;
}

export function useReactivateWso() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: reactivateWso,
    onSuccess: (_, { wsoId }) => {
      queryClient.invalidateQueries({ queryKey: ["wso"] });
      queryClient.invalidateQueries({ queryKey: ["wso", wsoId] });

      toast.success("WSO reactivated successfully.");
    },
    onError: (error: any) => {
      const message =
        error?.response?.data?.message ||
        error?.message ||
        "Failed to reactivate WSO.";

      toast.error(message);
    },
  });
}