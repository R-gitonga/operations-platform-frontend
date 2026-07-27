import { api } from "@/lib/api";

import type {
    ProductionStage,
    StageHistory,
    UpdateProductionStageRequest,
} from "@/types/production";

export async function getProductionStages(): Promise<ProductionStage[]> {

    const response = await api.get<ProductionStage[]>(
        "/production-stages"
    );

    return response.data;
}

export async function getStageHistory(
    wsoId: number,
): Promise<StageHistory[]> {

    const response = await api.get<StageHistory[]>(
        `/wso/${wsoId}/stage-history`
    );

    return response.data;
}

export async function updateProductionStage(
    wsoId: number,
    payload: UpdateProductionStageRequest,
) {

    const response = await api.post(
        `/wso/${wsoId}/stage`,
        payload,
    );

    return response.data;
}