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

import type { BrandingLocation } from "@/types/branding";

import { useCreateBrandingLocation } from "@/hooks/useCreateBrandingLocation";
import { useUpdateBrandingLocation } from "@/hooks/useUpdateBrandingLocation";

interface BrandingLocationDialogProps {
    open: boolean;

    onOpenChange: (open: boolean) => void;

    brandingLocation?: BrandingLocation;
}

export default function BrandingLocationDialog({
    open,
    onOpenChange,
    brandingLocation,
}: BrandingLocationDialogProps) {

    const [code, setCode] = useState("");

    const [displayName, setDisplayName] = useState("");

    const [description, setDescription] = useState("");

    const [displayOrder, setDisplayOrder] = useState(1);

    const createBrandingLocation = useCreateBrandingLocation();

    const updateBrandingLocation = useUpdateBrandingLocation();

    useEffect(() => {

        if (!open) {
            return;
        }

        if (brandingLocation) {

            setCode(brandingLocation.code);

            setDisplayName(brandingLocation.display_name);

            setDescription(brandingLocation.description ?? "");

            setDisplayOrder(brandingLocation.display_order);

        } else {

            setCode("");

            setDisplayName("");

            setDescription("");

            setDisplayOrder(1);

        }

    }, [brandingLocation, open]);

    async function handleSubmit() {

        if (brandingLocation) {

            await updateBrandingLocation.mutateAsync({

                id: brandingLocation.id,

                request: {

                    code,

                    display_name: displayName,

                    description: description.trim() === ""
                        ? null
                        : description,

                    display_order: displayOrder,

                    active: brandingLocation.active,

                },

            });

        } else {

            await createBrandingLocation.mutateAsync({

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
        createBrandingLocation.isPending || updateBrandingLocation.isPending;

    return (

        <Dialog
            open={open}
            onOpenChange={onOpenChange}
        >

            <DialogContent className="sm:max-w-xl">

                <DialogHeader>

                    <DialogTitle>

                        {brandingLocation
                            ? "Edit Branding Location"
                            : "Create Branding Location"}

                    </DialogTitle>

                    <DialogDescription>

                        Configure the branding locations available when adding products to a WSO.

                    </DialogDescription>

                </DialogHeader>

                <div className="space-y-5 py-2">

                    <div className="space-y-2">

                        <Label>Location Code</Label>

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
                            : brandingLocation
                                ? "Save Changes"
                                : "Create Location"}

                    </Button>

                </DialogFooter>

            </DialogContent>

        </Dialog>

    );

}