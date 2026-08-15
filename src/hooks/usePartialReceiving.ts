import { useQuery } from "@tanstack/react-query";

import {
    getPartialReceivingAttentionRequired,
} from "@/api/partialReceiving";

export function usePartialReceivingAttention() {
    return useQuery({
        queryKey: ["partial-receiving", "attention-required"],
        queryFn: getPartialReceivingAttentionRequired,
    });
}