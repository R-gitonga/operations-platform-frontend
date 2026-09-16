import { useState } from "react";

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

import { useUpdatePoLineItem } from "@/hooks/useUpdatePoLineItem";

import type { PoLineItem, UpdatePoLineItemRequest } from "@/types/purchaseOrder";
import type { ReactNode } from "react";

interface EditPoLineItemDialogProps {
    item: PoLineItem;
    purchaseOrderId: number;
    trigger?: ReactNode;
}

export default function EditPoLineItemDialog({
    item,
    purchaseOrderId,
    trigger,
}: EditPoLineItemDialogProps) {

    const [open, setOpen] = useState(false);

    const mutation = useUpdatePoLineItem();

    const [form, setForm] = useState({
        size: item.size,
        qty_ordered: item.qty_ordered,
    });

    function handleSave() {

        const payload: UpdatePoLineItemRequest = {
            size: form.size,
            qty_ordered: form.qty_ordered,
        };

        mutation.mutate(
            {
                id: item.id,
                purchaseOrderId,
                payload,
            },
            {
                onSuccess: () => setOpen(false),
            },
        );
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>

            <DialogTrigger asChild>
                {trigger ?? (
                    <Button size="sm" variant="outline">
                        Edit
                    </Button>
                )}
            </DialogTrigger>

            <DialogContent>

                <DialogHeader>
                    <DialogTitle>Edit Size / Quantity</DialogTitle>
                </DialogHeader>

                <div className="space-y-4">

                    <div>
                        <Label>Size</Label>

                        <Input
                            value={form.size}
                            onChange={(e) =>
                                setForm({ ...form, size: e.target.value })
                            }
                        />
                    </div>

                    <div>
                        <Label>Quantity Ordered</Label>

                        <Input
                            type="number"
                            value={form.qty_ordered}
                            onChange={(e) =>
                                setForm({
                                    ...form,
                                    qty_ordered: Number(e.target.value),
                                })
                            }
                        />
                    </div>

                    <div className="flex justify-end">
                        <Button
                            onClick={handleSave}
                            disabled={mutation.isPending}
                        >
                            {mutation.isPending ? "Saving" : "Save"}
                        </Button>
                    </div>

                </div>

            </DialogContent>

        </Dialog>
    );
}