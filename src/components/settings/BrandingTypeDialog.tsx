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
import { Textarea } from "@/components/ui/textarea";

import type { BrandingType } from "@/types/branding";

import { useCreateBrandingType } from "@/hooks/useCreateBrandingType";
import { useUpdateBrandingType } from "@/hooks/useUpdateBrandingType";

interface BrandingTypeDialogProps {
    open: boolean;

    onOpenChange: (open: boolean) => void;

    brandingType?: BrandingType;
}

export default function BrandingTypeDialog({
    open,
    onOpenChange,
    brandingType,
}: BrandingTypeDialogProps) {

    const [code, setCode] = useState("");

    const [displayName, setDisplayName] = useState("");

    const [description, setDescription] = useState("");

    const [displayOrder, setDisplayOrder] = useState(1);

    const createBrandingType = useCreateBrandingType();

    const updateBrandingType = useUpdateBrandingType();

    useEffect(() => {

        if (!open) {
            return;
        }

        if (brandingType) {

            setCode(brandingType.code);

            setDisplayName(brandingType.display_name);

            setDescription(brandingType.description ?? "");

            setDisplayOrder(brandingType.display_order);

        } else {

            setCode("");

            setDisplayName("");

            setDescription("");

            setDisplayOrder(1);

        }

    }, [brandingType, open]);

    async function handleSubmit() {

        if (brandingType) {

            await updateBrandingType.mutateAsync({

                id: brandingType.id,

                request: {

                    code,

                    display_name: displayName,

                    description: description.trim() === ""
                        ? null
                        : description,

                    display_order: displayOrder,

                    active: brandingType.active,

                },

            });

        } else {

            await createBrandingType.mutateAsync({

                code,

                display_name: displayName,

                description: description.trim() === ""
                    ? null
                    : description,

                display_order: displayOrder,

            });

        }

        onOpenChange(false);
    }

    const isSaving =
        createBrandingType.isPending || updateBrandingType.isPending;

    return (

        <Dialog
            open={open}
            onOpenChange={onOpenChange}
        >

            <DialogContent className="sm:max-w-xl">

                <DialogHeader>

                    <DialogTitle>

                        {brandingType
                            ? "Edit Branding Type"
                            : "Create Branding Type"}

                    </DialogTitle>

                    <DialogDescription>

                        Configure the branding types available when adding products to a WSO.

                    </DialogDescription>

                </DialogHeader>

                <div className="space-y-5 py-2">

                    <div className="space-y-2">

                        <Label>Type Code</Label>

                        <Input
                            value={code}
                            onChange={(e) =>
                                setCode(e.target.value)
                            }
                        />

                    </div>

                    <div className="space-y-2">

                        <Label>Display Name</Label>

                        <Input
                            value={displayName}
                            onChange={(e) =>
                                setDisplayName(e.target.value)
                            }
                        />

                    </div>

                    <div className="space-y-2">

                        <Label>Description</Label>

                        <Textarea
                            value={description}
                            onChange={(e) =>
                                setDescription(e.target.value)
                            }
                        />

                    </div>

                    <div className="space-y-2">

                        <Label>Display Order</Label>

                        <Input
                            type="number"
                            value={displayOrder}
                            onChange={(e) =>
                                setDisplayOrder(
                                    Number(e.target.value)
                                )
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
                            : brandingType
                                ? "Save Changes"
                                : "Create Type"}

                    </Button>

                </DialogFooter>

            </DialogContent>

        </Dialog>

    );

}