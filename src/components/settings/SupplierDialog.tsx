import { useEffect, useState } from "react";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import type { Supplier } from "@/types/supplier";

import { useCreateSupplier } from "@/hooks/useCreateSupplier";
import { useUpdateSupplier } from "@/hooks/useUpdateSupplier";

interface SupplierDialogProps {
    open: boolean;

    onOpenChange: (open: boolean) => void;

    supplier?: Supplier;
}

export default function SupplierDialog({
    open,
    onOpenChange,
    supplier,
}: SupplierDialogProps) {

    const [name, setName] = useState("");

    const [contactName, setContactName] = useState("");

    const [contactInfo, setContactInfo] = useState("");

    const createSupplier = useCreateSupplier();

    const updateSupplier = useUpdateSupplier();

    useEffect(() => {

        if (!open) {
            return;
        }

        if (supplier) {

            setName(supplier.name);

            setContactName(supplier.contact_name ?? "");

            setContactInfo(supplier.contact_info ?? "");

        } else {

            setName("");

            setContactName("");

            setContactInfo("");

        }

    }, [supplier, open]);

    async function handleSubmit() {

        const trimmedName = name.trim();

        const trimmedContactName = contactName.trim();

        const trimmedContactInfo = contactInfo.trim();

        if (supplier) {

            await updateSupplier.mutateAsync({

                id: supplier.id,

                request: {

                    name: trimmedName,

                    contact_name: trimmedContactName === ""
                        ? null
                        : trimmedContactName,

                    contact_info: trimmedContactInfo === ""
                        ? null
                        : trimmedContactInfo,

                    active: supplier.active,

                },

            });

        } else {

            await createSupplier.mutateAsync({

                name: trimmedName,

                contact_name: trimmedContactName === ""
                    ? null
                    : trimmedContactName,

                contact_info: trimmedContactInfo === ""
                    ? null
                    : trimmedContactInfo,

            });

        }

        onOpenChange(false);
    }

    const isSaving =
        createSupplier.isPending || updateSupplier.isPending;

    return (

        <Dialog
            open={open}
            onOpenChange={onOpenChange}
        >

            <DialogContent className="sm:max-w-xl">

                <DialogHeader>

                    <DialogTitle>

                        {supplier
                            ? "Edit Supplier"
                            : "Create Supplier"}

                    </DialogTitle>

                    <DialogDescription>

                        Configure the suppliers available when creating a Purchase Order.

                    </DialogDescription>

                </DialogHeader>

                <div className="space-y-5 py-2">

                    <div className="space-y-2">

                        <Label>Supplier Name</Label>

                        <Input
                            value={name}
                            onChange={(e) =>
                                setName(e.target.value)
                            }
                        />

                    </div>

                    <div className="space-y-2">

                        <Label>Point of Contact</Label>

                        <Input
                            value={contactName}
                            onChange={(e) =>
                                setContactName(e.target.value)
                            }
                        />

                    </div>

                    <div className="space-y-2">

                        <Label>Contact Info</Label>

                        <Input
                            value={contactInfo}
                            onChange={(e) =>
                                setContactInfo(e.target.value)
                            }
                        />

                    </div>

                </div>

                <DialogFooter>

                    <Button
                        variant="outline"
                        onClick={() =>
                            onOpenChange(false)
                        }
                    >
                        Cancel
                    </Button>

                    <Button
                        onClick={handleSubmit}
                        disabled={isSaving}
                    >

                        {isSaving
                            ? "Saving..."
                            : supplier
                                ? "Save Changes"
                                : "Create Supplier"}

                    </Button>

                </DialogFooter>

            </DialogContent>

        </Dialog>

    );

}