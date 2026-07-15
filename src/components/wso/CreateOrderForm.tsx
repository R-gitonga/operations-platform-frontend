
import { useNavigate } from "react-router-dom";
import { useState, type FormEvent } from "react";
import { Button } from "../ui/button";

import { useCategories } from "@/hooks/useCategories";
import { useCreateWso } from "@/hooks/useCreateWso";

import OrderForm from "../orders/OrderForm";
import LineItemsForm from "../orders/LineItemsForm";

import type { OrderFormData } from "@/types/orderForm";
import type { CreateCompleteWsoRequest } from "@/types/wso";
import { useEffect } from "react";


export default function WsoForm() {
    const navigate = useNavigate();

    const { data: categories } = useCategories();

    // const [categories, setCategories] = useState(fetchedCategories);

    const createMutation = useCreateWso();

    const [form, setForm] = useState<OrderFormData>({
        category_id: undefined,
        date_signed: "",
        wso_number: "",
        req_number: "",
        description: "",
        design_code: "",
        fabric_code: "",
        remarks: "",

        line_items: [
            {
                size: "",
                qty_raised: 0,
            },
        ],
    });



function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const payload: CreateCompleteWsoRequest = {
        category_id: form.category_id,
        date_signed: form.date_signed || undefined,
        wso_number: form.wso_number,
        req_number: form.req_number || undefined,
        description: form.description || undefined,
        design_code: form.design_code || undefined,
        fabric_code: form.fabric_code || undefined,
        remarks: form.remarks || undefined,

        line_items:
            form.line_items.map(item => ({
                size: item.size,
                qty_raised: item.qty_raised,
            })),
    };

createMutation.mutate(payload, {
    onSuccess: () => {
        navigate("/orders");
    },

    onError: (error) => {
        console.error(error);
        alert("Failed to create a Workshop Order.");
        }
    });
}

    return (

        <form
            className="space-y-8"
            onSubmit={handleSubmit}
        >
            <OrderForm
                form={form}
                setForm={setForm}
                categories={categories ?? []}
                
            />

            <LineItemsForm
                form={form}
                setForm={setForm}
            />

            <div className="flex justify-end">

                <Button 
                    type="submit"
                    disabled={createMutation.isPending}
                    >
                        {createMutation.isPending
                            ? "Creating..."
                            : "Create WSO"}
                </Button>

            </div>

        </form>
       
    );
}