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
import { useReactivatePurchaseOrder } from "@/hooks/useReactivatePurchaseOrder";

interface Props {
    id: number;
    trigger: ReactNode;
}

export default function ReactivatePurchaseOrderDialog({ id, trigger }: Props) {
    const [open, setOpen] = useState(false);
    const mutation = useReactivatePurchaseOrder();

    function handleReactivate() {
        mutation.mutate(id, { onSuccess: () => setOpen(false) });
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>{trigger}</DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Reactivate Purchase Order</DialogTitle>
                    <DialogDescription>
                        This makes the purchase order active again and allows it to
                        be edited.
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <Button variant="outline" onClick={() => setOpen(false)}>
                        Close
                    </Button>
                    <Button
                        onClick={handleReactivate}
                        disabled={mutation.isPending}
                    >
                        {mutation.isPending ? "Reactivating..." : "Reactivate"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
