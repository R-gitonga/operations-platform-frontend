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

import { useUpdateLineItem } from "@/hooks/useUpdateLineItem";

import type {
    WsoLineItem,
    UpdateWsoLineItemRequest,
} from "@/types/lineItem";
import type { ReactNode } from "react";

interface EditLineItemDialogProps {
    item: WsoLineItem;
    trigger?: ReactNode
}

export default function EditLineItemDialog({
    item,
    trigger,
}: EditLineItemDialogProps) {
    const [open, setOpen] = useState(false);

    const mutation = useUpdateLineItem();

    const [form, setForm] = useState({
        size: item.size,
        qty_raised: item.qty_raised,
    });

    function handleSave() {
        const payload: UpdateWsoLineItemRequest = {
            size: form.size,
            qty_raised: form.qty_raised,
        };

        mutation.mutate(
            {
                id: item.id,
                payload,
            },
            {
                onSuccess: () => {
                    setOpen(false);
                },

                onError: (err) => {
                    console.error(err);
                    alert("Failed to update line item.");
                },
            }
        );
    }

    return (
        <Dialog
            open={open}
            onOpenChange={setOpen}
        >
            <DialogTrigger asChild>
                
                {trigger ?? (
                    <Button
                        size="sm"
                        variant="outline"
                    >
                        Edit
                    </Button>
                )}
            </DialogTrigger>

            <DialogContent>

                <DialogHeader>
                    <DialogTitle>
                        Edit Line Item
                    </DialogTitle>
                </DialogHeader>

                <div className="space-y-4">
                    <div>
                        <Label>Size</Label>

                        <Input
                            value={form.size}
                            onChange={(e) => 
                                setForm({
                                    ...form,
                                    size: e.target.value,
                                })
                            }
                        />
                    </div>

                    <div>
                        <Label>Quantity Raised</Label>

                        <Input
                            type="number"
                            value={form.qty_raised}
                            onChange={(e) => 
                                setForm({
                                    ...form,
                                    qty_raised: Number(e.target.value),
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
