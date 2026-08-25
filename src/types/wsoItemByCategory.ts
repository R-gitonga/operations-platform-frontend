export interface WsoItemByCategory {
    wso_id: number;

    wso_number: string;

    wso_status: string;

    wso_item_id: number;

    description: string | null;

    design_code: string | null;

    fabric_code: string | null;

    category_id: number;

    category_name: string;

    current_stage_name: string | null;

    current_stage_color: string | null;

    total_qty_raised: number;

    total_qty_received: number;

    total_balance: number;
}