export interface OrderFormLineItem {
    size: string;
    qty_raised: number;
}

export interface OrderFormData {
    category_id?: number;

    date_signed: string;

    wso_number: string;

    req_number: string;

    description: string;

    design_code: string;

    fabric_code: string;

    remarks: string;

    line_items: OrderFormLineItem[];
}