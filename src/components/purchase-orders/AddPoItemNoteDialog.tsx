import { useState } from "react";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

import { useAddPoItemNote } from "@/hooks/useAddPoItemNote";

import type { ReactNode } from "react";

interface AddPoItemNoteDialogProps {
    poItemId: number;
    purchaseOrderId: number;
    trigger?: ReactNode;
}

export default function AddPoItemNoteDialog({
    poItemId,
    purchaseOrderId,
    trigger,
}: AddPoItemNoteDialogProps) {

    const [open, setOpen] = useState(false);

    const [note, setNote] = useState("");

    const mutation = useAddPoItemNote();

    function handleSave() {

        mutation.mutate(
            {
                poItemId,
                purchaseOrderId,
                payload: { note },
            },
            {
                onSuccess: () => {
                    setNote("");
                    setOpen(false);
                },
                // No onError here — useAddPoItemNote already shows
                // the error toast; adding another callback here
                // would fire a second, duplicate toast.
            },
        );
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>

            <DialogTrigger asChild>
                {trigger ?? (
                    <Button size="sm" variant="outline">
                        Add Note
                    </Button>
                )}
            </DialogTrigger>

            <DialogContent>

                <DialogHeader>
                    <DialogTitle>Add Note</DialogTitle>
                </DialogHeader>

                <div className="space-y-4">

                    <Textarea
                        placeholder="e.g. Supplier confirmed dispatch by courier, ETA Thursday"
                        value={note}
                        onChange={(e) => setNote(e.target.value)}
                        rows={4}
                    />

                    <div className="flex justify-end">
                        <Button
                            onClick={handleSave}
                            disabled={mutation.isPending || note.trim() === ""}
                        >
                            {mutation.isPending ? "Saving" : "Save"}
                        </Button>
                    </div>

                </div>

            </DialogContent>

        </Dialog>
    );
}