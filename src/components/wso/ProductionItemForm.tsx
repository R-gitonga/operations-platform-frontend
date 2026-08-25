import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

import AddCategoryDialog from "../categories/AddCategoryDialog";

import type { Category } from "@/types/category";
import type {
    ProductionItemFormData,
    ProductionItemBrandingFormData,
} from "@/types/productionItemForm";

import {
    useBrandingTypes,
    useBrandingLocations,
} from "@/hooks/useBranding";

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

    const {
        data: brandingTypes = [],
    } = useBrandingTypes();

    const {
        data: brandingLocations = [],
    } = useBrandingLocations();

    function addBrandingRequirement() {
        const newRequirement: ProductionItemBrandingFormData = {
            branding_type_id: 0,
            branding_location_id: 0,
            quantity: 0,
        };

        onChange({
            ...item,
            branding: [
                ...item.branding,
                newRequirement,
            ],
        });
    }

    function updateBrandingRequirement(
        index: number,
        changes: Partial<ProductionItemBrandingFormData>,
    ) {
        const updated = [...item.branding];

        updated[index] = {
            ...updated[index],
            ...changes,
        };

        onChange({
            ...item,
            branding: updated,
        });
    }

    function removeBrandingRequirement(
        index: number,
    ) {
        onChange({
            ...item,
            branding: item.branding.filter(
                (_, i) => i !== index
            ),
        });
    }

    function handleBrandingRequiredChange(
        checked: boolean,
    ) {
        onChange({
            ...item,
            branding_required: checked,
        });
    }

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

            {/* --------------------------------------------- */}
            {/* Branding */}
            {/* --------------------------------------------- */}

            <div className="flex items-center gap-3 mt-6">

                <Checkbox
                    checked={item.branding_required}
                    onCheckedChange={(checked) =>
                        handleBrandingRequiredChange(
                            checked === true
                        )
                    }
                />

                <Label>
                    Branding Required
                </Label>

            </div>

            {item.branding_required && (

                <div className="mt-6 rounded-lg border p-4">

                    <div className="flex items-center justify-between mb-4">

                        <h3 className="font-semibold">
                            Branding Requirements
                        </h3>

                    </div>

                    <div className="space-y-4">

                        {item.branding.map(
                            (branding, index) => (

                                <div
                                    key={index}
                                    className="grid grid-cols-[1fr_1fr_1fr_auto] gap-4 items-end"
                                >

                                    <div>

                                        <Label>
                                            Branding Type
                                        </Label>

                                        <Select
                                            value={
                                                branding.branding_type_id
                                                    ? branding.branding_type_id.toString()
                                                    : undefined
                                            }
                                            onValueChange={(value) =>
                                                updateBrandingRequirement(
                                                    index,
                                                    {
                                                        branding_type_id:
                                                            Number(value),
                                                    }
                                                )
                                            }
                                        >

                                            <SelectTrigger>

                                                <SelectValue placeholder="Select Type" />

                                            </SelectTrigger>

                                            <SelectContent>

                                                {brandingTypes.map(
                                                    (type) => (

                                                        <SelectItem
                                                            key={type.id}
                                                            value={type.id.toString()}
                                                        >
                                                            {
                                                                type.display_name
                                                            }
                                                        </SelectItem>

                                                    )
                                                )}

                                            </SelectContent>

                                        </Select>

                                    </div>

                                    <div>

                                        <Label>
                                            Branding Location
                                        </Label>

                                        <Select
                                            value={
                                                branding.branding_location_id
                                                    ? branding.branding_location_id.toString()
                                                    : undefined
                                            }
                                            onValueChange={(value) =>
                                                updateBrandingRequirement(
                                                    index,
                                                    {
                                                        branding_location_id:
                                                            Number(value),
                                                    }
                                                )
                                            }
                                        >

                                            <SelectTrigger>

                                                <SelectValue placeholder="Select Location" />

                                            </SelectTrigger>

                                            <SelectContent>

                                                {brandingLocations.map(
                                                    (location) => (

                                                        <SelectItem
                                                            key={location.id}
                                                            value={location.id.toString()}
                                                        >
                                                            {
                                                                location.display_name
                                                            }
                                                        </SelectItem>

                                                    )
                                                )}

                                            </SelectContent>

                                        </Select>

                                    </div>

                                    <div>

                                        <Label>
                                            Quantity
                                        </Label>

                                        <Input
                                            type="number"
                                            min={0}
                                            value={
                                                branding.quantity
                                            }
                                            onChange={(e) =>
                                                updateBrandingRequirement(
                                                    index,
                                                    {
                                                        quantity:
                                                            Number(
                                                                e.target
                                                                    .value
                                                            ),
                                                    }
                                                )
                                            }
                                        />

                                    </div>

                                    <Button
                                        type="button"
                                        variant="destructive"
                                        onClick={() =>
                                            removeBrandingRequirement(
                                                index
                                            )
                                        }
                                    >
                                        Remove
                                    </Button>

                                </div>

                            )
                        )}

                        <Button
                            type="button"
                            variant="outline"
                            onClick={
                                addBrandingRequirement
                            }
                        >
                            + Add Branding Requirement
                        </Button>

                    </div>

                </div>

            )}

        </div>
    );
}