export interface PartialReceivingAttentionItem {
    tracking_id: number;
    wso_id: number;
    wso_item_id: number;
    wso_number: string;
    description: string;
    design_code: string;
    fabric_code: string;
    first_partial_received_at: string;
    attention_after_days: number;
    elapsed_days: number;
    overdue_days: number;
    outstanding_quantity: number;
}