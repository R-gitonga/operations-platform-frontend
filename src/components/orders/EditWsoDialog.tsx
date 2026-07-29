import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "../ui/button";
import WsoHeaderForm from "../wso/WsoHeaderForm";

import { useState } from "react";

import { useUpdateWso } from "@/hooks/useUpdateWso";

import type {
    UpdateWsoRequest,
    WsoDetail,
} from "@/types/wso";

import type {
    WsoHeaderFormData,
} from "@/types/wsoHeaderForm";

interface EditOrderDialogProps {
    order: WsoDetail;
}

export default function EditOrderDialog({
    order,
}: EditOrderDialogProps) {

    const [open, setOpen] = useState(false);

    const updateMutation = useUpdateWso();

    const [header, setHeader] =
        useState<WsoHeaderFormData>({
            date_signed: order.date_signed ?? "",
            wso_number: order.wso_number,
            req_number: order.req_number ?? "",
        });

    function handleSave() {

        const payload: UpdateWsoRequest = {

            date_signed:
                header.date_signed || undefined,

            wso_number:
                header.wso_number,

            req_number:
                header.req_number || undefined,

        };

        updateMutation.mutate(
            {
                id: order.id,
                payload,
            },
            {
                onSuccess: () => {
                    setOpen(false);
                },

                onError: (err) => {
                    console.error(err);
                    alert("Failed to update Workshop Order.");
                },
            }
        );
    }

    return (

        <Dialog
            open={open}
            onOpenChange={setOpen}
        >

            <DialogTrigger asChild>

                <Button>
                    Edit
                </Button>

            </DialogTrigger>

            <DialogContent className="max-w-2xl">

                <DialogHeader>

                    <DialogTitle>

                        Edit Workshop Order

                    </DialogTitle>

                </DialogHeader>

                <WsoHeaderForm
                    header={header}
                    setHeader={setHeader}
                />

                <div className="flex justify-end">

                    <Button
                        onClick={handleSave}
                        disabled={updateMutation.isPending}
                    >

                        {updateMutation.isPending
                            ? "Saving..."
                            : "Save Changes"}

                    </Button>

                </div>

            </DialogContent>

        </Dialog>

    );
}