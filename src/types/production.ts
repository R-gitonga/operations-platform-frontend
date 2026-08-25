export interface ProductionStage {
    id: number;

    code: string;

    display_name: string;

    description: string | null;

    color: string;

    sort_order: number;
}

export type TimelineEventType = "stage_change" | "partial_received";

export interface StageHistory {
    // Prefixed ("stage-7" / "receipt-12") since entries now come
    // from two different backend sources.
    id: string;

    wso_item_id: number;

    event_type: TimelineEventType;

    // Only set when event_type is "stage_change".
    production_stage_id: number | null;

    stage_name: string;

    stage_color: string;

    notes: string | null;

    // Only set when event_type is "partial_received".
    quantity_received: number | null;

    total_raised: number | null;

    balance: number | null;

    changed_by: string;

    changed_at: string;
}

export interface UpdateProductionStageRequest {
    production_stage_id: number;

    notes?: string;
}