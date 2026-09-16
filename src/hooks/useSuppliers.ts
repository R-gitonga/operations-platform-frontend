import { useQuery } from "@tanstack/react-query";

import {
    getSuppliers,
    getAllSuppliers,
} from "@/api/suppliers";

export function useSuppliers() {
    return useQuery({
        queryKey: ["suppliers"],

        queryFn: getSuppliers,
    });
}

export function useAllSuppliers() {
    return useQuery({
        queryKey: ["suppliers", "all"],

        queryFn: getAllSuppliers,
    });
}