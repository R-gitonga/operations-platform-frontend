import type { WsoLineItem } from "./lineItem";
export interface WsoDetail {
    id: number,
    wso_number: string,
    req_number: string | null,
    description: string | null,
    remarks: string | null,
    status: string,
    line_item_count: number,
    total_quantity: number
    line_items: WsoLineItem[];
}