export interface Supplier {
    id: number;
    name: string;
    contact_name: string | null;
    contact_info: string | null;
    active: boolean;
    created_at: string;
    updated_at: string;
}

export interface CreateSupplierRequest {
    name: string;
    contact_name: string | null;
    contact_info: string | null;
}

export interface UpdateSupplierRequest {
    name: string;
    contact_name: string | null;
    contact_info: string | null;
    active: boolean;
}