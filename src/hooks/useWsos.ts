import { useQuery } from "@tanstack/react-query";

import { getWsos } from "@/api/wso";

export function useWsos(
    search?: string,
    status?: string,
) {
    return useQuery({
        queryKey: [
            "wsos",
            search,
            status,
        ],

        queryFn: () =>
                getWsos(search, status),
    });
}