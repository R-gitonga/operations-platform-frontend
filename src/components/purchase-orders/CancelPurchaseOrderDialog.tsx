import { useState } from "react";
import type { ReactNode } from "react";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useCancelPurchaseOrder } from "@/hooks/useCancelPurchaseOrder";

interface Props {
    id: number;
    trigger: ReactNode;
}

export default function CancelPurchaseOrderDialog({ id, trigger }: Props) {
    const [open, setOpen] = useState(false);
    const mutation = useCancelPurchaseOrder();

    function handleCancel() {
        mutation.mutate(id, { onSuccess: () => setOpen(false) });
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>{trigger}</DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Cancel Purchase Order</DialogTitle>
                    <DialogDescription>
                        This marks the purchase order as <strong>cancelled</strong>.
                        It can be reactivated later if needed.
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <Button variant="outline" onClick={() => setOpen(false)}>
                        Close
                    </Button>
                    <Button
                        variant="destructive"
                        onClick={handleCancel}
                        disabled={mutation.isPending}
                    >
                        {mutation.isPending ? "Cancelling..." : "Cancel Purchase Order"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
