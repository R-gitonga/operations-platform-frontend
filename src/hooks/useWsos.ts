import { useQuery } from "@tanstack/react-query";

import { getWsos } from "@/api/wso";

export function useWsos(
    search?: string,
    status?: string,
    classification?: string,
) {
    return useQuery({
        queryKey: [
            "wsos",
            search,
            status, classification,
        ],

        queryFn: () =>
                getWsos(search, status, classification),
    });
}