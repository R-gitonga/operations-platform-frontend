import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";

import type { BrandingType } from "@/types/branding";

import { useDeactivateBrandingType } from "@/hooks/useDeactivateBrandingType";

interface DeactivateBrandingTypeDialogProps {
    open: boolean;

    onOpenChange: (open: boolean) => void;

    brandingType?: BrandingType;
}

export default function DeactivateBrandingTypeDialog({
    open,
    onOpenChange,
    brandingType,
}: DeactivateBrandingTypeDialogProps) {

    const deactivateBrandingType = useDeactivateBrandingType();

    async function handleDeactivate() {

        if (!brandingType) return;

        await deactivateBrandingType.mutateAsync(brandingType.id);

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

                        Deactivate Branding Type

                    </DialogTitle>

                    <DialogDescription>

                        This will remove{" "}
                        <strong>{brandingType?.display_name}</strong>{" "}
                        from the branding types available on new WSOs.

                        <br />

                        <br />

                        Existing products already using this branding type
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
                        disabled={deactivateBrandingType.isPending}
                    >
                        {deactivateBrandingType.isPending
                            ? "Deactivating..."
                            : "Deactivate Type"}
                    </Button>

                </DialogFooter>

            </DialogContent>

        </Dialog>
    );
}