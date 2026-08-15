import { useQuery } from "@tanstack/react-query";

import { getPartialReceivingSettings } from "@/api/partialReceivingSettings";

export function usePartialReceivingSettings() {
    return useQuery({
        queryKey: ["partial-receiving", "settings"],
        queryFn: getPartialReceivingSettings,
    });
}