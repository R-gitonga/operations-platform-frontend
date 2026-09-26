import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
    ClipboardList,
    CheckCircle2,
    Ban,
    Package,
    ArrowDownCircle,
    AlertTriangle,
} from "lucide-react";

import { usePoDashboard, usePoOverdue } from "@/hooks/usePoDashboard";

import KpiCard from "@/components/dashboard/KpiCard";
import DashboardSection from "@/components/dashboard/DashboardSection";
import StatusBadge from "@/components/dashboard/StatusBadge";

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

export default function PurchaseOrderDashboardPage() {

    const navigate = useNavigate();

    const [activityPage, setActivityPage] = useState(1);

    const { data, isLoading, error } = usePoDashboard(activityPage, 10);

    const {
        data: overdueItems,
        isLoading: overdueLoading,
        error: overdueError,
    } = usePoOverdue();

    if (isLoading) {
        return <p>Loading dashboard...</p>;
    }

    if (error || !data) {
        return <p>Failed to load dashboard.</p>;
    }

    return (
        <div className="space-y-10">

            <div>
                <h1 className="text-3xl font-bold">Purchase Order Dashboard</h1>

                <p className="text-slate-500">Supplier Procurement Overview</p>
            </div>

            {/* ========================================= */}
            {/* Order Overview */}
            {/* ========================================= */}

            <DashboardSection title="Order Overview">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-5">

                    <KpiCard
                        title="Total Orders"
                        value={data.orders.total}
                        icon={ClipboardList}
                        color="text-slate-600"
                        onClick={() => navigate("/purchase-orders")}
                    />

                    <KpiCard
                        title="Active"
                        value={data.orders.active}
                        icon={Package}
                        color="text-blue-600"
                        onClick={() => navigate("/purchase-orders?status=active")}
                    />

                    <KpiCard
                        title="Partial"
                        value={data.orders.partial}
                        icon={ArrowDownCircle}
                        color="text-yellow-600"
                        onClick={() => navigate("/purchase-orders?status=partial")}
                    />

                    <KpiCard
                        title="Completed"
                        value={data.orders.completed}
                        icon={CheckCircle2}
                        color="text-green-600"
                        onClick={() => navigate("/purchase-orders?status=completed")}
                    />

                    <KpiCard
                        title="Cancelled"
                        value={data.orders.cancelled}
                        icon={Ban}
                        color="text-red-600"
                        onClick={() => navigate("/purchase-orders?status=cancelled")}
                    />

                </div>
            </DashboardSection>

            {/* ========================================= */}
            {/* Quantities */}
            {/* ========================================= */}

            <DashboardSection title="Ordering & Receiving">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-5">

                    <KpiCard
                        title="Qty Ordered"
                        value={data.quantities.qty_ordered}
                        icon={Package}
                        color="text-indigo-600"
                    />

                    <KpiCard
                        title="Qty Delivered"
                        value={data.quantities.qty_delivered}
                        icon={ArrowDownCircle}
                        color="text-blue-600"
                    />

                    <KpiCard
                        title="Qty Accepted"
                        value={data.quantities.qty_accepted}
                        icon={CheckCircle2}
                        color="text-green-600"
                    />

                    <KpiCard
                        title="Qty Defective"
                        value={data.quantities.qty_defective}
                        icon={AlertTriangle}
                        color="text-red-600"
                    />

                    <KpiCard
                        title="Outstanding"
                        value={data.quantities.outstanding}
                        icon={Package}
                        color="text-indigo-600"
                    />

                </div>
            </DashboardSection>

            {/* ========================================= */}
            {/* By Supplier */}
            {/* ========================================= */}

            <DashboardSection title="By Supplier">
                <Card>
                    <CardContent className="p-0">
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead className="border-b bg-slate-50">
                                    <tr>
                                        <th className="px-4 py-3 text-left font-medium text-slate-600">
                                            Supplier
                                        </th>
                                        <th className="px-4 py-3 text-left font-medium text-slate-600">
                                            Open Orders
                                        </th>
                                        <th className="px-4 py-3 text-left font-medium text-slate-600">
                                            Qty Ordered
                                        </th>
                                    </tr>
                                </thead>

                                <tbody className="divide-y">
                                    {data.by_supplier.length === 0 && (
                                        <tr>
                                            <td
                                                colSpan={3}
                                                className="px-4 py-6 text-center text-slate-500"
                                            >
                                                No suppliers yet.
                                            </td>
                                        </tr>
                                    )}

                                    {data.by_supplier.map((supplier) => (
                                        <tr key={supplier.supplier_id}>
                                            <td className="px-4 py-3 font-medium">
                                                {supplier.supplier_name}
                                            </td>
                                            <td className="px-4 py-3">
                                                {supplier.open_orders}
                                            </td>
                                            <td className="px-4 py-3">
                                                {supplier.total_qty_ordered}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </CardContent>
                </Card>
            </DashboardSection>

            {/* ========================================= */}
            {/* Recent Orders / Largest Outstanding */}
            {/* ========================================= */}

            <div className="grid gap-6 lg:grid-cols-2">

                <DashboardSection title="Recent Purchase Orders">
                    <Card>
                        <CardContent className="divide-y p-0">
                            {data.recent_orders.length === 0 && (
                                <p className="p-4 text-sm text-slate-500">
                                    No purchase orders yet.
                                </p>
                            )}

                            {data.recent_orders.map((order) => (
                                <div
                                    key={order.id}
                                    onClick={() =>
                                        navigate(`/purchase-orders/${order.id}`)
                                    }
                                    className="flex cursor-pointer items-center justify-between p-4 hover:bg-slate-50"
                                >
                                    <div>
                                        <p className="font-medium">
                                            {order.accounts_reference}
                                        </p>
                                        <p className="text-sm text-slate-500">
                                            {order.supplier_name}
                                        </p>
                                    </div>

                                    <StatusBadge status={order.derived_status} />
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                </DashboardSection>

                <DashboardSection title="Largest Outstanding Orders">
                    <Card>
                        <CardContent className="divide-y p-0">
                            {data.largest_outstanding.length === 0 && (
                                <p className="p-4 text-sm text-slate-500">
                                    Nothing outstanding right now.
                                </p>
                            )}

                            {data.largest_outstanding.map((order) => (
                                <div
                                    key={order.id}
                                    onClick={() =>
                                        navigate(`/purchase-orders/${order.id}`)
                                    }
                                    className="flex cursor-pointer items-center justify-between p-4 hover:bg-slate-50"
                                >
                                    <div>
                                        <p className="font-medium">
                                            {order.accounts_reference}
                                        </p>
                                        <p className="text-sm text-slate-500">
                                            {order.supplier_name}
                                        </p>
                                    </div>

                                    <span className="font-semibold text-indigo-600">
                                        {order.outstanding_qty} outstanding
                                    </span>
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                </DashboardSection>

            </div>

            {/* ========================================= */}
            {/* Recent Activity */}
            {/* ========================================= */}

            <DashboardSection title="Recent Activity">
                <Card>
                    <CardContent className="p-0">
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead className="border-b bg-slate-50">
                                    <tr>
                                        <th className="px-4 py-3 text-left font-medium text-slate-600">
                                            PO
                                        </th>
                                        <th className="px-4 py-3 text-left font-medium text-slate-600">
                                            Item
                                        </th>
                                        <th className="px-4 py-3 text-left font-medium text-slate-600">
                                            Activity
                                        </th>
                                        <th className="px-4 py-3 text-left font-medium text-slate-600">
                                            By
                                        </th>
                                        <th className="px-4 py-3 text-left font-medium text-slate-600">
                                            Date
                                        </th>
                                    </tr>
                                </thead>

                                <tbody className="divide-y">
                                    {data.recent_activity.items.map((activity) => (
                                        <tr
                                            key={`${activity.purchase_order_id}-${activity.po_item_id}-${activity.changed_at}-${activity.event_type}`}
                                            onClick={() =>
                                                navigate(
                                                    `/purchase-orders/${activity.purchase_order_id}`,
                                                )
                                            }
                                            className="cursor-pointer transition hover:bg-slate-50"
                                        >
                                            <td className="px-4 py-3 font-medium">
                                                {activity.accounts_reference}
                                            </td>

                                            <td className="px-4 py-3">
                                                {activity.item_description ?? "-"}
                                            </td>

                                            <td className="px-4 py-3">
                                                {activity.event_type === "receipt" && (
                                                    <div>
                                                        <span className="flex items-center gap-1.5 font-medium text-blue-600">
                                                            <ArrowDownCircle className="h-4 w-4" />
                                                            Delivery — {activity.size}
                                                        </span>
                                                        <span className="text-xs text-slate-500">
                                                            {activity.qty_delivered} delivered,
                                                            balance {activity.delivered_balance}
                                                        </span>
                                                    </div>
                                                )}

                                                {activity.event_type === "defect" && (
                                                    <div>
                                                        <span
                                                            className={`flex items-center gap-1.5 font-medium ${
                                                                activity.defect_status === "open"
                                                                    ? "text-red-600"
                                                                    : "text-emerald-600"
                                                            }`}
                                                        >
                                                            <AlertTriangle className="h-4 w-4" />
                                                            Defect — {activity.size}
                                                        </span>
                                                        <span className="text-xs text-slate-500">
                                                            {activity.qty_defective} unit(s),{" "}
                                                            {activity.defect_status}
                                                        </span>
                                                    </div>
                                                )}

                                                {activity.event_type === "note" && (
                                                    <span className="font-medium text-slate-600">
                                                        Note added
                                                    </span>
                                                )}
                                            </td>

                                            <td className="px-4 py-3 text-slate-500">
                                                {activity.changed_by}
                                            </td>

                                            <td className="whitespace-nowrap px-4 py-3 text-slate-500">
                                                {new Date(activity.changed_at).toLocaleString()}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <div className="flex items-center justify-between border-t px-4 py-3">
                            <div className="text-sm text-slate-500">
                                Showing page {data.recent_activity.page} of{" "}
                                {data.recent_activity.total_pages}
                            </div>

                            <div className="flex gap-2">
                                <button
                                    type="button"
                                    disabled={activityPage <= 1}
                                    onClick={() => setActivityPage((page) => page - 1)}
                                    className="rounded border px-3 py-1.5 text-sm disabled:cursor-not-allowed disabled:opacity-50"
                                >
                                    Previous
                                </button>

                                <button
                                    type="button"
                                    disabled={
                                        activityPage >= data.recent_activity.total_pages
                                    }
                                    onClick={() => setActivityPage((page) => page + 1)}
                                    className="rounded border px-3 py-1.5 text-sm disabled:cursor-not-allowed disabled:opacity-50"
                                >
                                    Next
                                </button>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </DashboardSection>

            {/* ========================================= */}
            {/* Overdue Deliveries */}
            {/* ========================================= */}

            <DashboardSection title="Overdue Deliveries">
                {overdueLoading ? (
                    <Card>
                        <CardContent className="p-6">
                            <p className="text-sm text-slate-500">
                                Checking for overdue deliveries...
                            </p>
                        </CardContent>
                    </Card>
                ) : overdueError ? (
                    <Card>
                        <CardContent className="p-6">
                            <p className="text-sm text-red-600">
                                Unable to load overdue deliveries.
                            </p>
                        </CardContent>
                    </Card>
                ) : !overdueItems || overdueItems.length === 0 ? (
                    <Card>
                        <CardContent className="p-6">
                            <p className="text-sm text-slate-500">
                                Nothing overdue right now.
                            </p>
                        </CardContent>
                    </Card>
                ) : (
                    <Card>
                        <CardContent className="divide-y p-0">
                            {overdueItems.map((item) => (
                                <div
                                    key={`${item.po_item_id}-${item.size}`}
                                    onClick={() =>
                                        navigate(
                                            `/purchase-orders/${item.purchase_order_id}`,
                                        )
                                    }
                                    className="flex cursor-pointer items-center justify-between p-4 hover:bg-slate-50"
                                >
                                    <div>
                                        <p className="font-medium">
                                            {item.accounts_reference} —{" "}
                                            {item.description ?? "Unnamed Product"} (
                                            {item.size})
                                        </p>
                                        <p className="text-sm text-slate-500">
                                            {item.supplier_name} — expected{" "}
                                            {new Date(
                                                item.expected_delivery_date,
                                            ).toLocaleDateString()}
                                        </p>
                                    </div>

                                    <div className="text-right">
                                        <p className="font-semibold text-red-600">
                                            {item.days_overdue} day(s) overdue
                                        </p>
                                        <p className="text-sm text-slate-500">
                                            {item.outstanding} outstanding
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                )}
            </DashboardSection>

        </div>
    );
}