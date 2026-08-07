import { api } from "@/lib/api";

import type {
    ProductionStage,
    ProductionStageItem,
    CreateProductionStageRequest,
    UpdateProductionStageRequest,
} from "@/types/productionStage";
export async function getProductionStages(): Promise<ProductionStage[]> {
    const response = await api.get("/production-stages");

    return response.data;
}

export async function getProductionStageItems(
    stageId: number,
): Promise<ProductionStageItem[]> {

    const response = await api.get(
        `/production-stages/${stageId}/items`
    );

    return response.data;
}

export async function createProductionStage(
    request: CreateProductionStageRequest,
): Promise<ProductionStage> {

    const response = await api.post(
        "/production-stages",
        request,
    );

    return response.data;
}

export async function updateProductionStage(
    id: number,
    request: UpdateProductionStageRequest,
): Promise<ProductionStage> {

    const response = await api.put(
        `/production-stages/${id}`,
        request,
    );

    return response.data;
}

export async function deactivateProductionStage(
    id: number,
): Promise<ProductionStage> {

    const response = await api.patch(
        `/production-stages/${id}/deactivate`,
    );

    return response.data;
}