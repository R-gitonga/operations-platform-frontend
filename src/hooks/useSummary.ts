import { useQuery } from "@tanstack/react-query";

import { getSummary } from "@/api/dashboard";


export function useSummary() {
    return useQuery({
        queryKey: ["wso-summary"],
        queryFn: getSummary,
    });
}