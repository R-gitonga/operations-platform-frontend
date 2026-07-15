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

import { useCreateLineItem } from "@/hooks/useCreateLineItem";

import type {
    CreateWsoLineItemRequest,
} from "@/types/lineItem";
import type { ReactNode } from "react";

interface AddLineItemDialogProps {
    wsoId: number;
    trigger?: ReactNode
}

export default function AddLineItemDialog({
    wsoId,
    trigger,
}: AddLineItemDialogProps) {
    const [open, setOpen] = useState(false);

    const mutation = useCreateLineItem();

    const [form, setForm] = useState({
        size: "",
        qty_raised: 0,
    });

    function handleSave() {
        const payload: CreateWsoLineItemRequest = {
            size: form.size,
            qty_raised: form.qty_raised,
        };

        mutation.mutate(
            {
                wsoId,
                payload,
            },
            {
                onSuccess: () => {
                    setOpen(false);
                },

                onError: (err) => {
                    console.error(err);
                    alert("Failed to create line item.");
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
                        Add +
                    </Button>
                )}
            </DialogTrigger>

            <DialogContent>

                <DialogHeader>
                    <DialogTitle>
                        Add Line Item
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
