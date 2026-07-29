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
    wsoItemId: number,
): Promise<StageHistory[]> {

    const response = await api.get<StageHistory[]>(
        `/wso-items/${wsoItemId}/stage-history`
    );

    return response.data;
}

export async function updateProductionStage(
    wsoItemId: number,
    payload: UpdateProductionStageRequest,
) {

    const response = await api.post(
        `/wso-items/${wsoItemId}/stage`,
        payload,
    );

    return response.data;
}