import { useState } from "react";

import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

import { useSuppliers } from "@/hooks/useSuppliers";
import { useUpdatePurchaseOrder } from "@/hooks/useUpdatePurchaseOrder";

import type {
    PurchaseOrderDetail,
    UpdatePurchaseOrderRequest,
} from "@/types/purchaseOrder";

interface Props {
    order: PurchaseOrderDetail;
}

export default function EditPurchaseOrderDialog({ order }: Props) {
    const [open, setOpen] = useState(false);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button>Edit</Button>
            </DialogTrigger>

            {open && (
                <DialogContent className="sm:max-w-xl">
                    <EditPurchaseOrderForm
                        order={order}
                        onClose={() => setOpen(false)}
                    />
                </DialogContent>
            )}
        </Dialog>
    );
}

function EditPurchaseOrderForm({
    order,
    onClose,
}: Props & { onClose: () => void }) {
    const [erpReference, setErpReference] = useState(order.erp_reference);
    const [accountsReference, setAccountsReference] = useState(order.accounts_reference);
    const [supplierId, setSupplierId] = useState<number | null>(order.supplier_id);
    const [description, setDescription] = useState(order.description ?? "");

    const { data: suppliers = [] } = useSuppliers();
    const mutation = useUpdatePurchaseOrder();

    function handleSave() {
        const payload: UpdatePurchaseOrderRequest = {
            erp_reference: erpReference.trim(),
            accounts_reference: accountsReference.trim(),
            supplier_id: supplierId ?? undefined,
            description: description.trim() || undefined,
        };

        mutation.mutate(
            { id: order.id, payload },
            { onSuccess: onClose },
        );
    }

    const canSave =
        erpReference.trim() !== "" &&
        accountsReference.trim() !== "" &&
        supplierId !== null;

    return (
        <>
            <DialogHeader>
                <DialogTitle>Edit Purchase Order</DialogTitle>
            </DialogHeader>

            <div className="space-y-5 py-2">
                    <div className="space-y-2">
                        <Label>ERP Reference</Label>
                        <Input
                            value={erpReference}
                            onChange={(event) => setErpReference(event.target.value)}
                        />
                    </div>

                    <div className="space-y-2">
                        <Label>Accounts Reference</Label>
                        <Input
                            value={accountsReference}
                            onChange={(event) => setAccountsReference(event.target.value)}
                        />
                    </div>

                    <div className="space-y-2">
                        <Label>Supplier</Label>
                        <Select
                            value={supplierId?.toString()}
                            onValueChange={(value) => setSupplierId(Number(value))}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select supplier" />
                            </SelectTrigger>
                            <SelectContent>
                                {suppliers.map((supplier) => (
                                    <SelectItem
                                        key={supplier.id}
                                        value={supplier.id.toString()}
                                    >
                                        {supplier.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-2">
                        <Label>Description</Label>
                        <Input
                            value={description}
                            onChange={(event) => setDescription(event.target.value)}
                        />
                    </div>
            </div>

            <DialogFooter>
                <Button variant="outline" onClick={onClose}>
                    Cancel
                </Button>
                <Button
                    onClick={handleSave}
                    disabled={mutation.isPending || !canSave}
                >
                    {mutation.isPending ? "Saving..." : "Save Changes"}
                </Button>
            </DialogFooter>
        </>
    );
}
