import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "../ui/button";
import type { UpdateWsoRequest, WsoDetail } from "@/types/wso";
import { useState } from "react";
import type { OrderFormData } from "@/types/orderForm";
import OrderForm from "./OrderForm";

import { useCategories } from "@/hooks/useCategories";
import { useUpdateWso } from "@/hooks/useUpdateWso";


interface EditOrderDialogProps {
    order: WsoDetail;
}

export default function EditOrderDialog({
    order,
}: EditOrderDialogProps) {
    //  FIXED: Hook moved inside the component body
    const [open, setOpen] = useState(false);

    const updateMutation = useUpdateWso();
    const { data: categories } = useCategories();

    const [form, setForm] = useState<OrderFormData>({
        category_id: order.category_id ?? undefined,
        date_signed: order.date_signed ?? "",
        wso_number: order.wso_number,
        req_number: order.req_number ?? "",
        description: order.description ?? "",
        design_code: order.design_code ?? "",
        fabric_code: order.fabric_code ?? "",
        remarks: order.remarks ?? "",

        line_items: [],
    });

    function handleSave() {
        const payload: UpdateWsoRequest = {
            category_id: form.category_id,
            date_signed: form.date_signed || undefined,
            wso_number: form.wso_number,
            req_number: form.req_number || undefined,
            description: form.description || undefined,
            design_code: form.design_code || undefined,
            fabric_code: form.fabric_code || undefined,
            remarks: form.remarks || undefined,
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

                onError: (error) => {
                    console.error(error);
                    alert("Failed to update Workshop Order.");
                },
            }
        );
    }

    return (
        <Dialog
            open={open}
            onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button>Edit</Button>
            </DialogTrigger>

            <DialogContent className="max-w-4xl">
                <DialogHeader>
                    <DialogTitle>
                        Edit Workshop Order
                    </DialogTitle>
                </DialogHeader>

                <OrderForm
                    form={form}
                    setForm={setForm}
                    categories={categories ?? []}
                />

                <div className="flex justify-end">
                    {/* Note: You will likely want to hook up an onClick to mutate here */}
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