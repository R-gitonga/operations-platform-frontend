import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";

import type { BrandingLocation } from "@/types/branding";

import { useDeactivateBrandingLocation } from "@/hooks/useDeactivateBrandingLocation";

interface DeactivateBrandingLocationDialogProps {
    open: boolean;

    onOpenChange: (open: boolean) => void;

    brandingLocation?: BrandingLocation;
}

export default function DeactivateBrandingLocationDialog({
    open,
    onOpenChange,
    brandingLocation,
}: DeactivateBrandingLocationDialogProps) {

    const deactivateBrandingLocation = useDeactivateBrandingLocation();

    async function handleDeactivate() {

        if (!brandingLocation) return;

        await deactivateBrandingLocation.mutateAsync(brandingLocation.id);

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

                        Deactivate Branding Location

                    </DialogTitle>

                    <DialogDescription>

                        This will remove{" "}
                        <strong>{brandingLocation?.display_name}</strong>{" "}
                        from the branding locations available on new WSOs.

                        <br />

                        <br />

                        Existing products already using this branding location
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
                        disabled={deactivateBrandingLocation.isPending}
                    >
                        {deactivateBrandingLocation.isPending
                            ? "Deactivating..."
                            : "Deactivate Location"}
                    </Button>

                </DialogFooter>

            </DialogContent>

        </Dialog>
    );
}