import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import { useDashboard } from "@/hooks/useDashboard";

export default function Dashboard() {
    const {
        data,
        isLoading,
        error,
    } = useDashboard();

    if (isLoading) {
        return <p>Loading Dashboard...</p>;
    }

    if (error) {
        return <p>Failed to load Dashboard.</p>;
    }

    return (
        <div className="space-y-8">

            <h1 className="text-3xl font-bold">
                Dashboard
            </h1>

            {/* -----------------------------
                ORDER STATUS CARDS
            ------------------------------ */}

            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">

                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm text-slate-500">
                            Total Orders
                        </CardTitle>
                    </CardHeader>

                    <CardContent>
                        <p className="text-3xl font-bold">
                            {data?.total_orders ?? 0}
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm text-slate-500">
                            Active Orders
                        </CardTitle>
                    </CardHeader>

                    <CardContent>
                        <p className="text-3xl font-bold">
                            {data?.active_orders ?? 0}
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm text-slate-500">
                            Partially Received
                        </CardTitle>
                    </CardHeader>

                    <CardContent>
                        <p className="text-3xl font-bold">
                            {data?.partial_orders ?? 0}
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm text-slate-500">
                            Completed Orders
                        </CardTitle>
                    </CardHeader>

                    <CardContent>
                        <p className="text-3xl font-bold">
                            {data?.completed_orders ?? 0}
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm text-slate-500">
                            Cancelled Orders
                        </CardTitle>
                    </CardHeader>

                    <CardContent>
                        <p className="text-3xl font-bold">
                            {data?.cancelled_orders ?? 0}
                        </p>
                    </CardContent>
                </Card>

            </div>

            {/* -----------------------------
                QUANTITY CARDS
            ------------------------------ */}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm text-slate-500">
                            Total Qty Raised
                        </CardTitle>
                    </CardHeader>

                    <CardContent>
                        <p className="text-3xl font-bold">
                            {data?.total_qty_raised ?? 0}
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm text-slate-500">
                            Total Qty Received
                        </CardTitle>
                    </CardHeader>

                    <CardContent>
                        <p className="text-3xl font-bold">
                            {data?.total_qty_received ?? 0}
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm text-slate-500">
                            Outstanding Balance
                        </CardTitle>
                    </CardHeader>

                    <CardContent>
                        <p className="text-3xl font-bold">
                            {data?.total_balance ?? 0}
                        </p>
                    </CardContent>
                </Card>

            </div>

            {/* -----------------------------
                TABLES
            ------------------------------ */}

            <div className="space-y-6">

                <Card>

                    <CardHeader>
                        <CardTitle>
                            Recent Workshop Orders
                        </CardTitle>
                    </CardHeader>

                    <CardContent>

                        <table className="w-full text-sm">

                            <thead>

                                <tr className="border-b">
                                    <th className="text-left py-2">
                                        WSO
                                    </th>

                                    <th className="text-left py-2">
                                        Status
                                    </th>
                                </tr>

                            </thead>

                            <tbody>

                                {data?.recent_orders.map((order) => (

                                    <tr
                                        key={order.id}
                                        className="border-b"
                                    >

                                        <td className="py-2">
                                            {order.wso_number}
                                        </td>

                                        <td className="py-2 capitalize">
                                            {order.status}
                                        </td>

                                    </tr>

                                ))}

                            </tbody>

                        </table>

                    </CardContent>

                </Card>

                <Card>

                    <CardHeader>
                        <CardTitle>
                            Largest Outstanding Orders
                        </CardTitle>
                    </CardHeader>

                    <CardContent>

                        <table className="w-full text-sm">

                            <thead>

                                <tr className="border-b">

                                    <th className="text-left py-2">
                                        WSO
                                    </th>

                                    <th className="text-right py-2">
                                        Outstanding
                                    </th>

                                </tr>

                            </thead>

                            <tbody>

                                {data?.largest_outstanding.map((order) => (

                                    <tr
                                        key={order.id}
                                        className="border-b"
                                    >

                                        <td className="py-2">
                                            {order.wso_number}
                                        </td>

                                        <td className="py-2 text-right">
                                            {order.outstanding_qty}
                                        </td>

                                    </tr>

                                ))}

                            </tbody>

                        </table>

                    </CardContent>

                </Card>

            </div>

        </div>
    );
}