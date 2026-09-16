import { useEffect, useState } from "react";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
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

import { useCategories } from "@/hooks/useCategories";
import { useBrandingTypes, useBrandingLocations } from "@/hooks/useBranding";
import { useUpdatePoItem } from "@/hooks/useUpdatePoItem";

import type { PoItemDetail, UpdatePoItemRequest } from "@/types/purchaseOrder";

interface Props {
    open: boolean;

    onOpenChange: (open: boolean) => void;

    purchaseOrderId: number;

    item: PoItemDetail;
}

export default function EditPoItemDialog({
    open,
    onOpenChange,
    purchaseOrderId,
    item,
}: Props) {

    const { data: categories = [] } = useCategories();

    const { data: brandingTypes = [] } = useBrandingTypes();

    const { data: brandingLocations = [] } = useBrandingLocations();

    const mutation = useUpdatePoItem();

    const [categoryId, setCategoryId] = useState<number | null>(null);

    const [description, setDescription] = useState("");

    const [expectedDeliveryDate, setExpectedDeliveryDate] = useState("");

    const [brandingRequired, setBrandingRequired] = useState(false);

    const [brandingTypeId, setBrandingTypeId] = useState<number | null>(null);

    const [brandingLocationId, setBrandingLocationId] = useState<number | null>(null);

    useEffect(() => {

        if (!open) {
            return;
        }

        setCategoryId(item.category_id);
        setDescription(item.description ?? "");
        setExpectedDeliveryDate(item.expected_delivery_date ?? "");
        setBrandingRequired(item.branding_required);
        setBrandingTypeId(item.branding_type_id);
        setBrandingLocationId(item.branding_location_id);

    }, [open, item]);

    function handleSave() {

        const payload: UpdatePoItemRequest = {
            category_id: categoryId,
            description: description.trim() === "" ? null : description,
            expected_delivery_date:
                expectedDeliveryDate === "" ? null : expectedDeliveryDate,
            branding_required: brandingRequired,
            branding_type_id: brandingRequired ? brandingTypeId : null,
            branding_location_id: brandingRequired ? brandingLocationId : null,
        };

        mutation.mutate(
            {
                id: item.id,
                purchaseOrderId,
                payload,
            },
            {
                onSuccess: () => onOpenChange(false),
                // No onError here — useUpdatePoItem already shows
                // the error toast.
            },
        );
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>

            <DialogContent className="sm:max-w-xl">

                <DialogHeader>
                    <DialogTitle>Edit Item</DialogTitle>
                </DialogHeader>

                <div className="space-y-5 py-2">

                    <div className="space-y-2">

                        <Label>Category</Label>

                        <Select
                            value={categoryId ? categoryId.toString() : undefined}
                            onValueChange={(value) => setCategoryId(Number(value))}
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

                    <div className="space-y-2">

                        <Label>Description</Label>

                        <Input
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />

                    </div>

                    <div className="space-y-2">

                        <Label>Expected Delivery Date</Label>

                        <Input
                            type="date"
                            value={expectedDeliveryDate}
                            onChange={(e) =>
                                setExpectedDeliveryDate(e.target.value)
                            }
                        />

                    </div>

                    <div className="flex items-center gap-3">

                        <Checkbox
                            checked={brandingRequired}
                            onCheckedChange={(checked) =>
                                setBrandingRequired(checked === true)
                            }
                        />

                        <Label>Branding Required</Label>

                    </div>

                    {brandingRequired && (

                        <div className="grid gap-4 sm:grid-cols-2">

                            <div className="space-y-2">

                                <Label>Branding Type</Label>

                                <Select
                                    value={
                                        brandingTypeId
                                            ? brandingTypeId.toString()
                                            : undefined
                                    }
                                    onValueChange={(value) =>
                                        setBrandingTypeId(Number(value))
                                    }
                                >

                                    <SelectTrigger>
                                        <SelectValue placeholder="Select Type" />
                                    </SelectTrigger>

                                    <SelectContent>
                                        {brandingTypes.map((type) => (
                                            <SelectItem
                                                key={type.id}
                                                value={type.id.toString()}
                                            >
                                                {type.display_name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>

                                </Select>

                            </div>

                            <div className="space-y-2">

                                <Label>Branding Location</Label>

                                <Select
                                    value={
                                        brandingLocationId
                                            ? brandingLocationId.toString()
                                            : undefined
                                    }
                                    onValueChange={(value) =>
                                        setBrandingLocationId(Number(value))
                                    }
                                >

                                    <SelectTrigger>
                                        <SelectValue placeholder="Select Location" />
                                    </SelectTrigger>

                                    <SelectContent>
                                        {brandingLocations.map((location) => (
                                            <SelectItem
                                                key={location.id}
                                                value={location.id.toString()}
                                            >
                                                {location.display_name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>

                                </Select>

                            </div>

                        </div>

                    )}

                </div>

                <DialogFooter>

                    <Button
                        variant="outline"
                        onClick={() => onOpenChange(false)}
                    >
                        Cancel
                    </Button>

                    <Button
                        onClick={handleSave}
                        disabled={mutation.isPending}
                    >
                        {mutation.isPending ? "Saving..." : "Save Changes"}
                    </Button>

                </DialogFooter>

            </DialogContent>

        </Dialog>
    );
}