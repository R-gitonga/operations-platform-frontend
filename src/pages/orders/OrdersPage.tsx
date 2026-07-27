import { useState, useEffect } from "react";

import {
    Link,
    useNavigate,
    useSearchParams,
} from "react-router-dom";

import { Search } from "lucide-react";

import { useWsos } from "@/hooks/useWsos";

import type { WsoOrder } from "@/types/wso";

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import {
    Input,
} from "@/components/ui/input";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

import { Button } from "@/components/ui/button";


export default function OrdersPage() {
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

    const {data, isLoading, error,} = useWsos(search, status);

    if (isLoading) {
        return <p>Loading orders...</p>
    }

    if (error) {
        return <p>Failed to load orders.</p>
    }

    return (

        <div className="space-y-6">

            <div className="flex items-center justify-between">

                <h1 className="text-3xl font-bold">
                    Workshop Orders
                </h1>

                <Button
                    onClick={() => navigate("/orders/new")}
                >
                    + New WSO
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
                                placeholder="Search WSO Number..."
                                value={search}
                                onChange={(e) =>
                                    setSearch(e.target.value)
                                }
                            />

                        </div>

                        <Select
                            value={status}
                            onValueChange={setStatus}
                        >

                            <SelectTrigger>

                                <SelectValue />

                            </SelectTrigger>

                            <SelectContent>

                                <SelectItem value="all">
                                    All Orders
                                </SelectItem>

                                <SelectItem value="active">
                                    Active
                                </SelectItem>

                                <SelectItem value="partial">
                                    Partial
                                </SelectItem>

                                <SelectItem value="completed">
                                    Completed
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

                        {data?.length ?? 0} Orders

                    </CardTitle>

                </CardHeader>

                <CardContent>

                    <div className="overflow-x-auto">

                        <table className="w-full">

                            <thead>

                                <tr className="border-b">

                                    <th className="text-left py-3">
                                        WSO Number
                                    </th>

                                    <th className="text-left py-3">
                                        Description
                                    </th>

                                    <th className="text-left py-3">
                                        Status
                                    </th>

                                    <th className="text-left py-3">
                                        REQ
                                    </th>

                                </tr>

                            </thead>

                            <tbody>

                                {data?.map((order: WsoOrder) => (

                                    <tr
                                        key={order.id}
                                        className="
                                            border-b
                                            hover:bg-slate-50
                                            cursor-pointer
                                        "
                                        onClick={() =>
                                            navigate(`/orders/${order.id}`)
                                        }
                                    >

                                        <td className="py-4 font-medium">

                                            {order.wso_number}

                                        </td>

                                        <td>

                                            {order.description}

                                        </td>

                                        <td>

                                            <span
                                                className="
                                                    rounded-full
                                                    bg-slate-100
                                                    px-3
                                                    py-1
                                                    text-sm
                                                "
                                            >

                                                {order.status}

                                            </span>

                                        </td>

                                        <td>

                                            {order.req_number}

                                        </td>

                                    </tr>

                                ))}

                            </tbody>

                        </table>

                        {data?.length === 0 && (

                            <div className="py-12 text-center text-slate-500">

                                No Workshop Orders found.

                            </div>

                        )}

                    </div>

                </CardContent>

            </Card>

        </div>

    );

}