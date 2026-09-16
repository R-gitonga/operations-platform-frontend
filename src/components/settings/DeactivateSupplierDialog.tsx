import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";

import type { Supplier } from "@/types/supplier";

import { useDeactivateSupplier } from "@/hooks/useDeactivateSupplier";

interface DeactivateSupplierDialogProps {
    open: boolean;

    onOpenChange: (open: boolean) => void;

    supplier?: Supplier;
}

export default function DeactivateSupplierDialog({
    open,
    onOpenChange,
    supplier,
}: DeactivateSupplierDialogProps) {

    const deactivateSupplier = useDeactivateSupplier();

    async function handleDeactivate() {

        if (!supplier) return;

        await deactivateSupplier.mutateAsync(supplier.id);

        onOpenChange(false);
    }

    return (

        <Dialog
            open={open}
            onOpenChange={onOpenChange}
        >

            <DialogContent className="sm:max-w-md">

                <DialogHeader>

                    <DialogTitle>

                        Deactivate Supplier

                    </DialogTitle>

                    <DialogDescription>

                        This will remove{" "}
                        <strong>{supplier?.name}</strong>{" "}
                        from the suppliers available on new Purchase Orders.

                        <br />

                        <br />

                        Existing purchase orders from this supplier
                        will be unaffected. You can reactivate it later.

                    </DialogDescription>

                </DialogHeader>

                <DialogFooter>

                    <Button
                        variant="outline"
                        onClick={() => onOpenChange(false)}
                    >
                        Cancel
                    </Button>

                    <Button
                        variant="destructive"
                        onClick={handleDeactivate}
                        disabled={deactivateSupplier.isPending}
                    >
                        {deactivateSupplier.isPending
                            ? "Deactivating..."
                            : "Deactivate Supplier"}
                    </Button>

                </DialogFooter>

            </DialogContent>

        </Dialog>
    );
}