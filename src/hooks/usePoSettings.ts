import { useQuery } from "@tanstack/react-query";

import { getPoSettings } from "@/api/poSettings";

export function usePoSettings() {
    return useQuery({
        queryKey: ["po-settings"],
        queryFn: getPoSettings,
    });
}