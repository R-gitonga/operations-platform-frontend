export interface ProductionStage {
    id: number;

    code: string;

    display_name: string;

    description: string | null;

    color: string;

    sort_order: number;
}

export interface StageHistory {
    id: number;

    wso_order_id: number;

    production_stage_id: number;

    stage_name: string;

    stage_color: string;

    notes: string | null;

    changed_by: string;

    changed_at: string;
}

export interface UpdateProductionStageRequest {
    production_stage_id: number;

    notes?: string;
}
