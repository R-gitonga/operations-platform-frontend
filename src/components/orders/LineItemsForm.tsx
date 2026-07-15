import type { OrderFormData } from "@/types/orderForm";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";

interface LineItemsFormProps {
    form: OrderFormData;

    setForm: React.Dispatch<
        React.SetStateAction<OrderFormData>
    >;
}



export default function LineItemsForm({
    
    form,
    setForm,
}: LineItemsFormProps) {
    function addLineItem() {
    setForm({
        ...form,
        line_items: [
            ...(form.line_items ?? []),
            {
                size: "",
                qty_raised: 0,
            },
        ],
    });
}
    return (
    <div className="rounded-lg border bg-white p-6 shadow-sm">
                    <h2 className="mb-4 text-xl font-semibold">
                        Line Items
                    </h2>

                    <div className="space-y-4">
                        {(form.line_items ?? []).map((item, index) => (
                            <div key={index} className="grid grid-cols-[1fr_1fr_auto] gap-4 items-end">
                                <div className="space-y-2">
                                    <Label>Size</Label>

                                    <Input
                                        value={item.size}
                                        onChange={(e) => {
                                            const updated = [...(form.line_items ?? [])];
                                            updated[index].size = e.target.value;

                                            setForm({
                                                ...form,
                                                line_items: updated,
                                            });
                                        }}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label>Qty Raised</Label>

                                    <Input
                                        type="number"
                                        value={item.qty_raised}
                                        onChange={(e) => {
                                            const updated = [...(form.line_items ?? [])];
                                            updated[index].qty_raised = Number(e.target.value);

                                            setForm({
                                                ...form,
                                                line_items: updated,
                                            });
                                        }}
                                    />
                                </div>

                                <div>
                                    {(form.line_items ?? []).length > 1 && (

                                        <Button
                                            type="button"
                                            variant="destructive"
                                            onClick={() =>
                                                setForm({
                                                    ...form,
                                                    line_items: (form.line_items ?? []).filter(
                                                        (_, i) => i !== index
                                                    ),
                                                })
                                            }
                                        >
                                            Remove
                                        </Button>
                                    )}

                                </div>

                            </div>
                        ))}

                        <Button
                            type="button"
                            variant="outline"
                            onClick={addLineItem}
                        >
                            + Add Line Item
                        </Button>

                    </div>

                </div>
)
}
