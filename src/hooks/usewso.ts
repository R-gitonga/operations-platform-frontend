import { useQuery } from "@tanstack/react-query";

import { getWso } from "@/api/wso";

export function useWso(id: number) {
    return useQuery({
        queryKey: ["wso", id],
        queryFn: () => getWso(id),
    });
}