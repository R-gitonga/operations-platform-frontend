import { api } from "@/lib/api";

import type {
    PartialReceivingAttentionItem,
} from "@/types/partialReceiving";

export async function getPartialReceivingAttentionRequired(): Promise<
    PartialReceivingAttentionItem[]
> {
    const response =
        await api.get<PartialReceivingAttentionItem[]>(
            "/partial-receiving/attention-required",
        );

    return response.data;
}