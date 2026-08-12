export interface OrderSummary {
    total: number;
    active: number;
    partial: number;
    completed: number;
    cancelled: number;
}

export interface ProductionSummary {
    qty_raised: number;
    qty_received: number;
    balance: number;
}

export interface ProductionStageSummary {
    stage_id: number;
    stage_name: string;
    stage_color: string;
    item_count: number;
}

export interface DashboardRecentActivity {
    wso_id: number;
    wso_number: string;
    wso_item_id: number;
    description: string;
    stage_name: string;
    changed_by: string | null;
    changed_at: string;
}

export interface RecentActivityPage {
    items: DashboardRecentActivity[];
    page: number;
    page_size: number;
    total: number;
    total_pages: number;
}

export interface DashboardRecentOrder {
    id: number;
    wso_number: string;
    status: string;
}

export interface DashboardOutstandingOrder {
    id: number;
    wso_number: string;
    outstanding_qty: number;
}

export interface DashboardSummary {
    orders: OrderSummary;

    production: ProductionSummary;

    production_stages: ProductionStageSummary[];

    recent_activity: RecentActivityPage;

    recent_orders: DashboardRecentOrder[];

    outstanding_orders: DashboardOutstandingOrder[];
}

export interface AttentionRequiredItem {
    wso_id: number;
    wso_number: string;
    wso_item_id: number;
    description: string;
    design_code: string;
    fabric_code: string;
    current_stage_id: number;
    current_stage_name: string;
    current_stage_color: string;
    stage_started_at: string;
    expected_duration_hours: number;
    elapsed_hours: number;
    overdue_hours: number;
}