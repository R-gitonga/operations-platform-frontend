export interface ProductionStage {
    id: number;
    code: string;
    display_name: string;
    display_order: number;
    color: string;
    active: boolean;
    expected_duration_hours: number | null;
    attention_enabled: boolean;
}

export interface ProductionStageItem {
    wso_id: number;

    wso_number: string;

    wso_item_id: number;

    description: string;

    design_code: string;

    fabric_code: string;

    stage_name: string;

    stage_color: string;

    current_stage_changed_at: string;

    current_stage_changed_by: string | null;


}

export interface CreateProductionStageRequest {
    code: string;

    display_name: string;

    display_order: number;

    color: string;

    expected_duration_hours: number | null;

    attention_enabled: boolean;
}

export interface UpdateProductionStageRequest {
    code: string;

    display_name: string;

    display_order: number;

    color: string;

    expected_duration_hours: number | null;

    attention_enabled: boolean;
}