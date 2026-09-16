import { useState, useEffect } from "react";

import { useNavigate, useSearchParams } from "react-router-dom";

import { Search } from "lucide-react";

import { usePurchaseOrders } from "@/hooks/usePurchaseOrders";
import type { PurchaseOrder } from "@/types/purchaseOrder";

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import { Input } from "@/components/ui/input";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

import { Button } from "@/components/ui/button";

export default function PurchaseOrdersPage() {
    const navigate = useNavigate();

    const [searchParams, setSearchParams] = useSearchParams();

    const initialSearch = searchParams.get("search") ?? "";

    const initialStatus = searchParams.get("status") ?? "all";

    const [search, setSearch] = useState(initialSearch);

    const [status, setStatus] = useState(initialStatus);

    useEffect(() => {

        const params = new URLSearchParams();

        if (search.trim() !== "") {
            params.set("search", search);
        }

        if (status !== "all") {
            params.set("status", status);
        }

        setSearchParams(params);
    }, [search, status, setSearchParams]);

    const { data, isLoading, error } = usePurchaseOrders(search, status);

    if (isLoading) {
        return <p>Loading purchase orders...</p>;
    }

    if (error) {
        return <p>Failed to load purchase orders.</p>;
    }

    return (

        <div className="space-y-6">

            <div className="flex items-center justify-between">

                <h1 className="text-3xl font-bold">
                    Purchase Orders
                </h1>

                <Button onClick={() => navigate("/purchase-orders/new")}>
                    + New Purchase Order
                </Button>

            </div>

            <Card>

                <CardHeader>

                    <CardTitle>
                        Search & Filters
                    </CardTitle>

                </CardHeader>

                <CardContent>

                    <div className="grid gap-4 md:grid-cols-2">

                        <div className="relative">

                            <Search
                                className="
                                    absolute
                                    left-3
                                    top-3
                                    h-4
                                    w-4
                                    text-slate-400
                                "
                            />

                            <Input
                                className="pl-9"
                                placeholder="Search ERP or Accounts reference..."
                                value={search}
                                onChange={(e) =>
                                    setSearch(e.target.value)
                                }
                            />

                        </div>

                        {/*
                            Only "active" / "cancelled" are real,
                            stored states — everything else about a
                            PO (partial/fully received, overdue,
                            defects) is derived, so it does not
                            belong in this filter until we build the
                            derived-state layer, which will filter
                            client-side or via its own query params.
                        */}
                        <Select
                            value={status}
                            onValueChange={setStatus}
                        >

                            <SelectTrigger>

                                <SelectValue />

                            </SelectTrigger>

                            <SelectContent>

                                <SelectItem value="all">
                                    All Purchase Orders
                                </SelectItem>

                                <SelectItem value="active">
                                    Active
                                </SelectItem>

                                <SelectItem value="cancelled">
                                    Cancelled
                                </SelectItem>

                            </SelectContent>

                        </Select>

                    </div>

                </CardContent>

            </Card>

            <Card>

                <CardHeader>

                    <CardTitle>

                        {data?.length ?? 0} Purchase Orders

                    </CardTitle>

                </CardHeader>

                <CardContent>

                    <div className="overflow-x-auto">

                        <table className="w-full">

                            <thead>

                                <tr className="border-b">

                                    <th className="text-left py-3">
                                        ERP Reference
                                    </th>

                                    <th className="text-left py-3">
                                        Accounts Reference
                                    </th>

                                    <th className="text-left py-3">
                                        Supplier
                                    </th>

                                    <th className="text-left py-3">
                                        Status
                                    </th>

                                </tr>

                            </thead>

                            <tbody>

                                {data?.map((order: PurchaseOrder) => (

                                    <tr
                                        key={order.id}
                                        className="
                                            border-b
                                            hover:bg-slate-50
                                            cursor-pointer
                                        "
                                        onClick={() =>
                                            navigate(`/purchase-orders/${order.id}`)
                                        }
                                    >

                                        <td className="py-4 font-medium">

                                            {order.erp_reference}

                                        </td>

                                        <td>

                                            {order.accounts_reference}

                                        </td>

                                        <td>

                                            {order.supplier_name}

                                        </td>

                                        <td>

                                            <span
                                                className="
                                                    rounded-full
                                                    bg-slate-100
                                                    px-3
                                                    py-1
                                                    text-sm
                                                    capitalize
                                                "
                                            >

                                                {order.status}

                                            </span>

                                        </td>

                                    </tr>

                                ))}

                            </tbody>

                        </table>

                        {data?.length === 0 && (

                            <div className="py-12 text-center text-slate-500">

                                No Purchase Orders found.

                            </div>

                        )}

                    </div>

                </CardContent>

            </Card>

        </div>

    );

}