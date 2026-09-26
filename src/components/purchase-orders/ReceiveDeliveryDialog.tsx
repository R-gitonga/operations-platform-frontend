import { useMemo, useState } from "react";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

import { useRecordPoReceipt } from "@/hooks/useRecordPoReceipt";

import type {
    CreatePoReceiptLineRequest,
    PurchaseOrderDetail,
} from "@/types/purchaseOrder";
import type { ReactNode } from "react";

interface Props {
    order: PurchaseOrderDetail;
    trigger?: ReactNode;
}

interface ReceivableLine {
    lineItemId: number;
    itemDescription: string;
    size: string;
    qtyOrdered: number;
    totalDelivered: number;
    maxDeliverable: number;
}

// maxDeliverable is capped against qty_ordered - total_delivered
// (raw delivered, not accepted) -- that's exactly what the backend
// validates against, regardless of any defects reported later.
export default function ReceiveDeliveryDialog({ order, trigger }: Props) {

    const [open, setOpen] = useState(false);

    const [deliveryNoteReference, setDeliveryNoteReference] = useState("");
    const [notes, setNotes] = useState("");
    const [quantities, setQuantities] = useState<Record<number, number>>({});

    const mutation = useRecordPoReceipt();

    const receivableLines: ReceivableLine[] = useMemo(() => {
        return order.items.flatMap((item) =>
            item.line_items.map((line) => ({
                lineItemId: line.id,
                itemDescription: item.description || "Unnamed Product",
                size: line.size,
                qtyOrdered: line.qty_ordered,
                totalDelivered: line.total_delivered,
                maxDeliverable: line.qty_ordered - line.total_delivered,
            })),
        );
    }, [order]);

    function setQuantity(lineItemId: number, value: number) {
        setQuantities((prev) => ({ ...prev, [lineItemId]: value }));
    }

    function resetForm() {
        setDeliveryNoteReference("");
        setNotes("");
        setQuantities({});
    }

    const lines: CreatePoReceiptLineRequest[] = Object.entries(quantities)
        .filter(([, qty]) => qty > 0)
        .map(([lineItemId, qty]) => ({
            po_line_item_id: Number(lineItemId),
            qty_delivered: qty,
        }));

    function handleSave() {
        mutation.mutate(
            {
                purchaseOrderId: order.id,
                payload: {
                    delivery_note_reference: deliveryNoteReference || null,
                    notes: notes || null,
                    lines,
                },
            },
            {
                onSuccess: () => {
                    resetForm();
                    setOpen(false);
                },
            },
        );
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>

            <DialogTrigger asChild>
                {trigger ?? <Button>Record Delivery</Button>}
            </DialogTrigger>

            <DialogContent className="sm:max-w-2xl">

                <DialogHeader>
                    <DialogTitle>Record Delivery</DialogTitle>
                </DialogHeader>

                <section className="space-y-4">

                    <div className="grid grid-cols-2 gap-4">

                        <div className="space-y-2">
                            <Label>Delivery Note Reference</Label>

                            <Input
                                value={deliveryNoteReference}
                                onChange={(e) =>
                                    setDeliveryNoteReference(e.target.value)
                                }
                            />
                        </div>

                        <div className="space-y-2">
                            <Label>Notes</Label>

                            <Textarea
                                value={notes}
                                onChange={(e) => setNotes(e.target.value)}
                            />
                        </div>

                    </div>

                    <div className="max-h-80 overflow-y-auto rounded-md border">

                        <Table>

                            <TableHeader>
                                <TableRow>
                                    <TableHead>Product</TableHead>
                                    <TableHead>Size</TableHead>
                                    <TableHead>Ordered</TableHead>
                                    <TableHead>Delivered So Far</TableHead>
                                    <TableHead>Qty Delivered Now</TableHead>
                                </TableRow>
                            </TableHeader>

                            <TableBody>

                                {receivableLines.map((line) => (

                                    <TableRow key={line.lineItemId}>

                                        <TableCell>{line.itemDescription}</TableCell>

                                        <TableCell>{line.size}</TableCell>

                                        <TableCell>{line.qtyOrdered}</TableCell>

                                        <TableCell>{line.totalDelivered}</TableCell>

                                        <TableCell>
                                            <Input
                                                type="number"
                                                min={0}
                                                max={Math.max(line.maxDeliverable, 0)}
                                                disabled={line.maxDeliverable <= 0}
                                                value={quantities[line.lineItemId] ?? ""}
                                                onChange={(e) =>
                                                    setQuantity(
                                                        line.lineItemId,
                                                        Number(e.target.value),
                                                    )
                                                }
                                                className="w-24"
                                            />
                                        </TableCell>

                                    </TableRow>

                                ))}

                            </TableBody>

                        </Table>

                    </div>

                    <div className="flex justify-end gap-2">

                        <Button variant="outline" onClick={() => setOpen(false)}>
                            Cancel
                        </Button>

                        <Button
                            onClick={handleSave}
                            disabled={mutation.isPending || lines.length === 0}
                        >
                            {mutation.isPending ? "Saving" : "Record Delivery"}
                        </Button>

                    </div>

                </section>

            </DialogContent>

        </Dialog>
    );
}