import { useQuery } from "@tanstack/react-query";

import { getAttentionRequired } from "@/api/dashboard";


export function useAttentionRequired() {
    return useQuery({
        queryKey: ["dashboard", "attention-required"],
        queryFn: getAttentionRequired,
    });
}