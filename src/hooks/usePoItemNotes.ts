import { useQuery } from "@tanstack/react-query";

import { getPoItemNotes } from "@/api/purchaseOrders";

export function usePoItemNotes(poItemId: number) {
    return useQuery({
        queryKey: ["po-item-notes", poItemId],

        queryFn: () => getPoItemNotes(poItemId),
    });
}