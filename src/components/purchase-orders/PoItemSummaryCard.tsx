import { useState } from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Button } from "@/components/ui/button";

import type { PoItemDetail } from "@/types/purchaseOrder";

import EditPoItemDialog from "./EditPoItemDialog";

interface Props {
    purchaseOrderId: number;
    purchaseOrderStatus: string;
    item: PoItemDetail;
}

function SummaryRow({ label, value }: { label: string; value: number }) {
    return (
        <div className="flex items-center justify-between border-b py-2 last:border-b-0">
            <span className="font-medium text-slate-600">{label}</span>

            <span className="font-semibold">{value}</span>
        </div>
    );
}

function DetailRow({ label, value }: { label: string; value?: string | null }) {
    return (
        <div className="border-b py-3 last:border-b-0">
            <p className="text-sm font-medium text-slate-500">{label}</p>

            <p className="mt-1">{value && value.trim().length > 0 ? value : "-"}</p>
        </div>
    );
}

function formatDate(value?: string | null) {

    if (!value) {
        return "-";
    }

    return new Date(value).toLocaleDateString(undefined, {
        dateStyle: "medium",
    });
}

export default function PoItemSummaryCard({
    purchaseOrderId,
    purchaseOrderStatus,
    item,
}: Props) {

    const [dialogOpen, setDialogOpen] = useState(false);

    const isLocked =
        purchaseOrderStatus.toLowerCase() === "cancelled";

    return (
        <>
            <Card>

                <CardHeader className="flex flex-row items-center justify-between">

                    <CardTitle>Item Details</CardTitle>

                    {!isLocked && (
                        <Button onClick={() => setDialogOpen(true)}>
                            Edit Item
                        </Button>
                    )}

                </CardHeader>

                <CardContent className="space-y-6">

                    <DetailRow
                        label="Expected Delivery Date"
                        value={formatDate(item.expected_delivery_date)}
                    />

                    <DetailRow
                        label="Added By"
                        value={item.created_by}
                    />

                    <DetailRow
                        label="Added On"
                        value={formatDate(item.created_at)}
                    />

                    {item.branding_required && (
                        <div className="border-t pt-6">

                            <div className="mb-3">
                                <p className="text-sm font-medium text-slate-500">
                                    Branding
                                </p>

                                <p className="mt-1 font-medium">
                                    Required
                                </p>
                            </div>

                            {item.branding_type_name || item.branding_location_name ? (

                                <div className="rounded-md border bg-slate-50 p-3">

                                    <p className="font-medium">
                                        {item.branding_type_name ?? "-"}
                                    </p>

                                    <p className="text-sm text-slate-500">
                                        {item.branding_location_name ?? "-"}
                                    </p>

                                </div>

                            ) : (

                                <p className="text-sm text-slate-500">
                                    No branding type/location selected yet.
                                </p>

                            )}

                        </div>
                    )}

                    <div className="pt-2">

                        <SummaryRow
                            label="Line Items"
                            value={item.line_items.length}
                        />

                        <SummaryRow
                            label="Qty Ordered"
                            value={item.total_qty_ordered}
                        />

                    </div>

                </CardContent>

            </Card>

            <EditPoItemDialog
                open={dialogOpen}
                onOpenChange={setDialogOpen}
                purchaseOrderId={purchaseOrderId}
                item={item}
            />
        </>
    );
}