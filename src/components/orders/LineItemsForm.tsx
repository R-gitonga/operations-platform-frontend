import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";

import type { ProductionItemFormData } from "@/types/productionItemForm";

interface LineItemsFormProps {
    item: ProductionItemFormData;

    onChange: (
        item: ProductionItemFormData
    ) => void;
}

export default function LineItemsForm({
    item,
    onChange,
}: LineItemsFormProps) {

    function addLineItem() {
        onChange({
            ...item,
            line_items: [
                ...item.line_items,
                {
                    size: "",
                    qty_raised: 0,
                },
            ],
        });
    }

    function updateSize(
        index: number,
        value: string,
    ) {
        const updated = [...item.line_items];

        updated[index] = {
            ...updated[index],
            size: value,
        };

        onChange({
            ...item,
            line_items: updated,
        });
    }

    function updateQtyRaised(
        index: number,
        value: number,
    ) {
        const updated = [...item.line_items];

        updated[index] = {
            ...updated[index],
            qty_raised: value,
        };

        onChange({
            ...item,
            line_items: updated,
        });
    }

    function removeLineItem(
        index: number,
    ) {
        onChange({
            ...item,
            line_items: item.line_items.filter(
                (_, i) => i !== index
            ),
        });
    }

    return (
        <div className="rounded-lg border bg-white p-6 shadow-sm">

            <h2 className="mb-4 text-xl font-semibold">
                Sizes
            </h2>

            <div className="space-y-4">

                {item.line_items.map((lineItem, index) => (

                    <div
                        key={index}
                        className="grid grid-cols-[1fr_1fr_auto] gap-4 items-end"
                    >

                        <div>

                            <Label>Size</Label>

                            <Input
                                value={lineItem.size}
                                onChange={(e) =>
                                    updateSize(
                                        index,
                                        e.target.value
                                    )
                                }
                            />

                        </div>

                        <div>

                            <Label>Qty Raised</Label>

                            <Input
                                type="number"
                                value={lineItem.qty_raised}
                                onChange={(e) =>
                                    updateQtyRaised(
                                        index,
                                        Number(e.target.value)
                                    )
                                }
                            />

                        </div>

                        <div>

                            {item.line_items.length > 1 && (

                                <Button
                                    type="button"
                                    variant="destructive"
                                    onClick={() =>
                                        removeLineItem(index)
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
                    + Add Size
                </Button>

            </div>

        </div>
    );
}