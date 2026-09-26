import { useMemo } from "react";

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

import { usePoReceipts } from "@/hooks/usePoReceipts";

import type { PurchaseOrderDetail } from "@/types/purchaseOrder";

interface Props {
    order: PurchaseOrderDetail;
}

function formatDateTime(value: string) {
    return new Date(value).toLocaleString();
}

export default function PoReceiptsCard({ order }: Props) {

    const { data: receipts, isLoading } = usePoReceipts(order.id);

    const lineLookup = useMemo(() => {

        const map = new Map<number, string>();

        order.items.forEach((item) => {
            item.line_items.forEach((line) => {
                map.set(
                    line.id,
                    `${item.description || "Unnamed Product"} — ${line.size}`,
                );
            });
        });

        return map;
    }, [order]);

    return (

        <Card>

            <CardHeader>
                <CardTitle>Delivery History</CardTitle>
            </CardHeader>

            <CardContent>

                {isLoading && (
                    <p className="text-sm text-slate-500">Loading deliveries...</p>
                )}

                {!isLoading && (!receipts || receipts.length === 0) && (
                    <p className="text-sm text-slate-500">
                        No deliveries recorded yet.
                    </p>
                )}

                {receipts && receipts.length > 0 && (

                    <div className="space-y-6">

                        {receipts.map((receipt) => (

                            <div key={receipt.id} className="rounded-md border p-4">

                                <div className="flex flex-wrap items-center justify-between gap-2">

                                    <div>
                                        <p className="font-medium">
                                            {formatDateTime(receipt.received_at)}
                                        </p>

                                        <p className="text-sm text-slate-500">
                                            Received by {receipt.received_by}
                                            {receipt.delivery_note_reference
                                                ? ` — Delivery Note: ${receipt.delivery_note_reference}`
                                                : ""}
                                        </p>
                                    </div>

                                </div>

                                {receipt.notes && (
                                    <p className="mt-2 text-sm text-slate-600">
                                        {receipt.notes}
                                    </p>
                                )}

                                <Table className="mt-3">

                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Product / Size</TableHead>
                                            <TableHead>Qty Delivered</TableHead>
                                            <TableHead>Total Delivered To Date</TableHead>
                                            <TableHead>Balance After</TableHead>
                                        </TableRow>
                                    </TableHeader>

                                    <TableBody>
                                        {receipt.lines.map((line) => (
                                            <TableRow key={line.id}>
                                                <TableCell>
                                                    {lineLookup.get(line.po_line_item_id) ??
                                                        `Line #${line.po_line_item_id}`}
                                                </TableCell>
                                                <TableCell>{line.qty_delivered}</TableCell>
                                                <TableCell>
                                                    {line.total_delivered_to_date}
                                                </TableCell>
                                                <TableCell>{line.delivered_balance}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>

                                </Table>

                            </div>

                        ))}

                    </div>

                )}

            </CardContent>

        </Card>

    );
}