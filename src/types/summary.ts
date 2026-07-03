export interface WsoSummary {
    total_orders: number;
    status_counts: Record<string, number>;
    total_quantity: number;
}