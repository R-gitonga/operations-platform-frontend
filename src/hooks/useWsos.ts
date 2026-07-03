import { useQuery } from "@tanstack/react-query";

import { getWsos } from "@/api/wso";

export function useWsos() {
    return useQuery({
        queryKey: ["wsos"],
        queryFn: getWsos,
    });
}