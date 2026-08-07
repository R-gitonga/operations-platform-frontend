import { useQuery } from "@tanstack/react-query";

import { getProductionStages } from "@/api/productionStage";

export function useProductionStages() {

    return useQuery({

        queryKey: ["production-stages"],

        queryFn: getProductionStages,

    });

}