import { useQuery } from "@tanstack/react-query";

import { getProductionStages } from "@/api/production";

export function useProductionStages() {

    return useQuery({

        queryKey: ["production-stages"],

        queryFn: getProductionStages,

    });

}