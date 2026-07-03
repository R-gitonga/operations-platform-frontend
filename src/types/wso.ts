export interface WsoOrder {
    id: number;
    wso_number: string;
    req_number: string | null;
    description: string | null;
    remarks: string | null;
    status: string;
    created_at: string;
    updated_at: string;
}