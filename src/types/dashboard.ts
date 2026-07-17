export interface DashboardRecentOrder {
    id: number;
    wso_number: string;
    status: string;
}

export interface DashboardOutstanding {
    id: number;
    wso_number: string;
    outstanding_qty: number;
}

export interface DashboardSummary {

    total_orders: number;

    active_orders: number;

    partial_orders: number;

    completed_orders: number;

    cancelled_orders: number;

    total_qty_raised: number;

    total_qty_received: number;

    total_balance: number;

    recent_orders: DashboardRecentOrder[];

    largest_outstanding: DashboardOutstanding[];
}