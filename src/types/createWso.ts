export interface CreateWsoLineItemRequest {
    size: string,
    quantity: number;
}

export interface CreateCompleteWsoRequest {
    wso_number: string,
    req_number: string | null,
    description: string | null,
    remarks: string | null,

    line_items: CreateWsoLineItemRequest[];
}