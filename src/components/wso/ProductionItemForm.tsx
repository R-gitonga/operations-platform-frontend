import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

import AddCategoryDialog from "../categories/AddCategoryDialog";

import type { Category } from "@/types/category";
import type { ProductionItemFormData } from "@/types/productionItemForm";

interface ProductionItemFormProps {
    item: ProductionItemFormData;

    onChange: (item: ProductionItemFormData) => void;

    categories: Category[];
}

export default function ProductionItemForm({
    item,
    onChange,
    categories,
}: ProductionItemFormProps) {
    return (
        <div className="rounded-lg border bg-white p-6 shadow-sm">

            <h2 className="mb-6 text-xl font-semibold">
                Production Item
            </h2>

            <div className="space-y-2">

                <div className="flex items-center justify-between">

                    <Label>Category</Label>

                    <AddCategoryDialog
                        onCreated={(category) =>
                            onChange({
                                ...item,
                                category_id: category.id,
                            })
                        }
                    />

                </div>

                <Select
                    value={item.category_id?.toString()}
                    onValueChange={(value) =>
                        onChange({
                            ...item,
                            category_id: Number(value),
                        })
                    }
                >

                    <SelectTrigger>

                        <SelectValue placeholder="Select Category" />

                    </SelectTrigger>

                    <SelectContent>

                        {categories.map((category) => (

                            <SelectItem
                                key={category.id}
                                value={category.id.toString()}
                            >
                                {category.name}
                            </SelectItem>

                        ))}

                    </SelectContent>

                </Select>

            </div>

            <div className="grid gap-6 md:grid-cols-2 mt-6">

                <div>

                    <Label>Description</Label>

                    <Input
                        value={item.description}
                        onChange={(e) =>
                            onChange({
                                ...item,
                                description: e.target.value,
                            })
                        }
                    />

                </div>

                <div>

                    <Label>Design Code</Label>

                    <Input
                        value={item.design_code}
                        onChange={(e) =>
                            onChange({
                                ...item,
                                design_code: e.target.value,
                            })
                        }
                    />

                </div>

                <div>

                    <Label>Fabric Code</Label>

                    <Input
                        value={item.fabric_code}
                        onChange={(e) =>
                            onChange({
                                ...item,
                                fabric_code: e.target.value,
                            })
                        }
                    />

                </div>

            </div>

            <div className="flex items-center gap-3 mt-6">

                <Checkbox
                    checked={item.branding_required}
                    onCheckedChange={(checked) =>
                        onChange({
                            ...item,
                            branding_required: checked === true,
                        })
                    }
                />

                <Label>
                    Branding Required
                </Label>

            </div>

        </div>
    );
}