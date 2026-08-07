import { useState } from "react";

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

import { toast } from "sonner";

import { useCancelWso } from "@/hooks/useCancelWso";

import { getApiErrorMessage } from "@/lib/apiError";

import type { ReactNode } from "react";

interface CancelWsoDialogProps {
    id: number;
    trigger: ReactNode;
}

export default function CancelWsoDialog({
    id,
    trigger,
}: CancelWsoDialogProps) {

    const [open, setOpen] = useState(false);

    const mutation = useCancelWso();

    function handleCancel() {

        mutation.mutate(id, {

            onSuccess: () => {

                toast.success(
                    "Workshop Order cancelled successfully."
                );

                setOpen(false);
            },

            onError: (error) => {

                toast.error(
                    getApiErrorMessage(error)
                );
            },
        });
    }

    return (
        <Dialog
            open={open}
            onOpenChange={setOpen}
        >

            <DialogTrigger asChild>
                {trigger}
            </DialogTrigger>

            <DialogContent>

                <DialogHeader>

                    <DialogTitle>
                        Cancel Workshop Order
                    </DialogTitle>

                    <DialogDescription>
                        This will mark the workshop order as{" "}
                        <strong>Cancelled</strong>.
                        <br />
                        This action can be reversed later by an administrator if
                        required.
                    </DialogDescription>

                </DialogHeader>

                <DialogFooter>

                    <Button
                        variant="outline"
                        onClick={() => setOpen(false)}
                    >
                        Close
                    </Button>

                    <Button
                        variant="destructive"
                        onClick={handleCancel}
                        disabled={mutation.isPending}
                    >
                        {mutation.isPending
                            ? "Cancelling..."
                            : "Cancel WSO"}
                    </Button>

                </DialogFooter>

            </DialogContent>

        </Dialog>
    );
}