import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";

import type { ProductionStage } from "@/types/productionStage";

import { useDeactivateProductionStage } from "@/hooks/useDeactivateProductionStage";

interface DeactivateProductionStageDialogProps {
    open: boolean;

    onOpenChange: (open: boolean) => void;

    stage?: ProductionStage;
}

export default function DeactivateProductionStageDialog({
    open,
    onOpenChange,
    stage,
}: DeactivateProductionStageDialogProps) {

    const deactivateStage = useDeactivateProductionStage();

    async function handleDeactivate() {

        if (!stage) return;

        await deactivateStage.mutateAsync(stage.id);

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

                        Deactivate Production Stage

                    </DialogTitle>

                    <DialogDescription>

                        This will remove{" "}
                        <strong>{stage?.display_name}</strong>{" "}
                        from the production workflow.

                        <br />

                        <br />

                        Products can no longer be moved into this stage.

                        Existing production history will be preserved.

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
                        disabled={deactivateStage.isPending}
                    >
                        {deactivateStage.isPending
                            ? "Deactivating..."
                            : "Deactivate Stage"}
                    </Button>

                </DialogFooter>

            </DialogContent>

        </Dialog>
    );
}