import { useState } from "react";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";

import { useDeleteLineItem } from "@/hooks/useDeleteLineItem";

import type { WsoLineItem } from "@/types/lineItem";

interface Props {
    item: WsoLineItem;
    trigger: React.ReactNode;
}

export default function DeleteLineItemDialog({
    item,
    trigger,
}: Props) {
    const [open, setOpen] = useState(false);

    const deleteMUtation = useDeleteLineItem();

    function handleDelete() {
        deleteMUtation.mutate(item.id, {
            onSuccess: () => {
                setOpen(false);
            },

            onError: (error) => {
                console.error(error);
                alert("Failed to delete line item.");
            },
        });
    }

    return (
        <Dialog
            open={open}
            onOpenChange={setOpen}
        >
            <DialogTrigger asChild>
                {trigger}
            </DialogTrigger>

            <DialogContent>

                <DialogHeader>
                    <DialogTitle>
                        Delete Line Item
                    </DialogTitle>
                </DialogHeader>

                <p>
                    Are you sure you want to delete size <strong>{item.size}?</strong>
                </p>

                <div className="flex justify-end gap-2">

                    <Button
                        variant="outline"
                        onClick={() => setOpen(false)}
                    >
                        Cancel
                    </Button>

                    <Button
                        variant="destructive"
                        onClick={handleDelete}
                        disabled={deleteMUtation.isPending}
                    >
                        {deleteMUtation.isPending ? "Deleting..." : "Delete"}
                    </Button>

                </div>

            </DialogContent>

        </Dialog>
    );
}