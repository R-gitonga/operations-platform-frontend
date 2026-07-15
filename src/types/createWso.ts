export interface CreateWsoLineItemRequest {
    qty_raised: string | number | readonly string[] | undefined;
    size: string,
    // quantity: number;
}

export interface CreateCompleteWsoRequest {
    category_id: any;
    date_signed: string | number | readonly string[] | undefined;
    design_code: string | number | readonly string[] | undefined;
    fabric_code: string | number | readonly string[] | undefined;
    wso_number: string,
    req_number: string | null,
    description: string | null,
    remarks: string | null,

    line_items: CreateWsoLineItemRequest[];
}