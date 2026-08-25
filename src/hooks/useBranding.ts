import { useQuery } from "@tanstack/react-query";

import {
    getBrandingTypes,
    getAllBrandingTypes,
    getBrandingLocations,
    getAllBrandingLocations,
} from "@/api/branding";

export function useBrandingTypes() {
    return useQuery({
        queryKey: ["branding-types"],

        queryFn: getBrandingTypes,
    });
}

export function useAllBrandingTypes() {
    return useQuery({
        queryKey: ["branding-types", "all"],

        queryFn: getAllBrandingTypes,
    });
}

export function useBrandingLocations() {
    return useQuery({
        queryKey: ["branding-locations"],

        queryFn: getBrandingLocations,
    });
}

export function useAllBrandingLocations() {
    return useQuery({
        queryKey: ["branding-locations", "all"],

        queryFn: getAllBrandingLocations,
    });
}