export interface BrandingType {
    id: number;
    code: string;
    display_name: string;
    description: string | null;
    display_order: number;
    active: boolean;
    created_at: string;
    updated_at: string;
}

export interface BrandingLocation {
    id: number;
    code: string;
    display_name: string;
    description: string | null;
    display_order: number;
    active: boolean;
    created_at: string;
    updated_at: string;
}

export interface CreateBrandingTypeRequest {
    code: string;
    display_name: string;
    description: string | null;
    display_order: number;
}

export interface UpdateBrandingTypeRequest {
    code: string;
    display_name: string;
    description: string | null;
    display_order: number;
    active: boolean;
}

export interface CreateBrandingLocationRequest {
    code: string;
    display_name: string;
    description: string | null;
    display_order: number;
}

export interface UpdateBrandingLocationRequest {
    code: string;
    display_name: string;
    description: string | null;
    display_order: number;
    active: boolean;
}

export interface CreateBrandingRequirementRequest {
    branding_type_id: number;
    branding_location_id: number;
    quantity: number;
}

export interface WsoItemBrandingDetail {
    id: number;
    wso_item_id: number;
    branding_type_id: number;
    branding_type_code: string;
    branding_type_name: string;
    branding_location_id: number;
    branding_location_code: string;
    branding_location_name: string;
    quantity: number;
    created_at: string;
    updated_at: string;
}