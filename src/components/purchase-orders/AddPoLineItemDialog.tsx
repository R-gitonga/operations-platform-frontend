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

import { useAddPoLineItem } from "@/hooks/useAddPoLineItem";

import type { CreatePoLineItemRequest } from "@/types/purchaseOrder";
import type { ReactNode } from "react";

interface AddPoLineItemDialogProps {
    poItemId: number;
    purchaseOrderId: number;
    trigger?: ReactNode;
}

export default function AddPoLineItemDialog({
    poItemId,
    purchaseOrderId,
    trigger,
}: AddPoLineItemDialogProps) {

    const [open, setOpen] = useState(false);

    const mutation = useAddPoLineItem();

    const [form, setForm] = useState({
        size: "",
        qty_ordered: 0,
    });

    function handleSave() {

        const payload: CreatePoLineItemRequest = {
            size: form.size,
            qty_ordered: form.qty_ordered,
        };

        mutation.mutate(
            {
                poItemId,
                purchaseOrderId,
                payload,
            },
            {
                onSuccess: () => {
                    setForm({ size: "", qty_ordered: 0 });
                    setOpen(false);
                },
            },
        );
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>

            <DialogTrigger asChild>
                {trigger ?? (
                    <Button size="sm" variant="outline">
                        Add +
                    </Button>
                )}
            </DialogTrigger>

            <DialogContent>

                <DialogHeader>
                    <DialogTitle>Add Size / Quantity</DialogTitle>
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