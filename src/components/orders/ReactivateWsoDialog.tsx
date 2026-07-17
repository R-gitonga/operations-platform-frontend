import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

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
import { api } from "@/lib/api";

import type { ReactNode } from "react";

interface Props {
    id: number;
    trigger: ReactNode;
}

export default function ReactivateWsoDialog({
    id,
    trigger,
}: Props) {

    const [open, setOpen] = useState(false);

    const queryClient = useQueryClient();

    const mutation = useMutation({

        mutationFn: async () => {
            await api.post(`/wso/${id}/reactivate`);
        },

        onSuccess: () => {

            queryClient.invalidateQueries({
                queryKey: ["wso", id],
            });

            queryClient.invalidateQueries({
                queryKey: ["wsos"],
            });

            queryClient.invalidateQueries({
                queryKey: ["summary"],
            });

            setOpen(false);
        },
    });

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
                        Reactivate Workshop Order
                    </DialogTitle>

                    <DialogDescription>
                        This will reactivate the Workshop Order and allow production and receiving to continue.
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
                        onClick={() => mutation.mutate()}
                        disabled={mutation.isPending}
                    >
                        {mutation.isPending
                            ? "Reactivating..."
                            : "Reactivate"}
                    </Button>

                </DialogFooter>

            </DialogContent>

        </Dialog>
    );
}