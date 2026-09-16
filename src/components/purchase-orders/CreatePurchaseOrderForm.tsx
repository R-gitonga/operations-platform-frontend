import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

import { useBrandingLocations, useBrandingTypes } from "@/hooks/useBranding";
import { useCategories } from "@/hooks/useCategories";
import { useCreatePurchaseOrder } from "@/hooks/useCreatePurchaseOrder";
import { useSuppliers } from "@/hooks/useSuppliers";

import type {
    CreatePoItemRequest,
    CreatePurchaseOrderRequest,
} from "@/types/purchaseOrder";

interface PurchaseOrderItemFormData {
    categoryId: number | null;
    description: string;
    expectedDeliveryDate: string;
    brandingRequired: boolean;
    brandingTypeId: number | null;
    brandingLocationId: number | null;
    lineItems: Array<{ size: string; qtyOrdered: number }>;
}

function createItem(): PurchaseOrderItemFormData {
    return {
        categoryId: null,
        description: "",
        expectedDeliveryDate: "",
        brandingRequired: false,
        brandingTypeId: null,
        brandingLocationId: null,
        lineItems: [{ size: "", qtyOrdered: 1 }],
    };
}

export default function CreatePurchaseOrderForm() {
    const navigate = useNavigate();
    const { data: suppliers = [] } = useSuppliers();
    const { data: categories = [] } = useCategories();
    const { data: brandingTypes = [] } = useBrandingTypes();
    const { data: brandingLocations = [] } = useBrandingLocations();
    const createMutation = useCreatePurchaseOrder();

    const [erpReference, setErpReference] = useState("");
    const [accountsReference, setAccountsReference] = useState("");
    const [supplierId, setSupplierId] = useState<number | null>(null);
    const [description, setDescription] = useState("");
    const [items, setItems] = useState<PurchaseOrderItemFormData[]>([createItem()]);

    function updateItem(index: number, update: Partial<PurchaseOrderItemFormData>) {
        setItems((current) => current.map((item, itemIndex) => (
            itemIndex === index ? { ...item, ...update } : item
        )));
    }

    function updateLineItem(
        itemIndex: number,
        lineIndex: number,
        update: Partial<PurchaseOrderItemFormData["lineItems"][number]>,
    ) {
        const lineItems = items[itemIndex].lineItems.map((line, index) => (
            index === lineIndex ? { ...line, ...update } : line
        ));

        updateItem(itemIndex, { lineItems });
    }

    function addLineItem(itemIndex: number) {
        updateItem(itemIndex, {
            lineItems: [...items[itemIndex].lineItems, { size: "", qtyOrdered: 1 }],
        });
    }

    function removeLineItem(itemIndex: number, lineIndex: number) {
        updateItem(itemIndex, {
            lineItems: items[itemIndex].lineItems.filter((_, index) => index !== lineIndex),
        });
    }

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        if (supplierId === null) {
            return;
        }

        const payload: CreatePurchaseOrderRequest = {
            erp_reference: erpReference.trim(),
            accounts_reference: accountsReference.trim(),
            supplier_id: supplierId,
            description: description.trim() || null,
            items: items.map((item): CreatePoItemRequest => ({
                category_id: item.categoryId,
                description: item.description.trim() || null,
                expected_delivery_date: item.expectedDeliveryDate || null,
                branding_required: item.brandingRequired,
                branding_type_id: item.brandingRequired ? item.brandingTypeId : null,
                branding_location_id: item.brandingRequired ? item.brandingLocationId : null,
                line_items: item.lineItems.map((line) => ({
                    size: line.size.trim(),
                    qty_ordered: line.qtyOrdered,
                })),
            })),
        };

        createMutation.mutate(payload, {
            onSuccess: (order) => navigate(`/purchase-orders/${order.id}`),
        });
    }

    const hasValidItems = items.every((item) => (
        item.lineItems.length > 0 &&
        item.lineItems.every((line) => line.size.trim() !== "" && line.qtyOrdered > 0) &&
        (!item.brandingRequired || (
            item.brandingTypeId !== null && item.brandingLocationId !== null
        ))
    ));

    const canSubmit =
        erpReference.trim() !== "" &&
        accountsReference.trim() !== "" &&
        supplierId !== null &&
        items.length > 0 &&
        hasValidItems;

    return (
        <form className="space-y-8" onSubmit={handleSubmit}>
            <Card>
                <CardHeader>
                    <CardTitle>Purchase Order</CardTitle>
                </CardHeader>
                <CardContent className="grid gap-6 md:grid-cols-2">
                    <div className="space-y-2">
                        <Label>ERP Reference</Label>
                        <Input
                            required
                            value={erpReference}
                            onChange={(event) => setErpReference(event.target.value)}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label>Accounts Reference</Label>
                        <Input
                            required
                            value={accountsReference}
                            onChange={(event) => setAccountsReference(event.target.value)}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label>Supplier</Label>
                        <Select
                            value={supplierId?.toString()}
                            onValueChange={(value) => setSupplierId(Number(value))}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select supplier" />
                            </SelectTrigger>
                            <SelectContent>
                                {suppliers.map((supplier) => (
                                    <SelectItem key={supplier.id} value={supplier.id.toString()}>
                                        {supplier.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-2">
                        <Label>Description</Label>
                        <Input
                            value={description}
                            onChange={(event) => setDescription(event.target.value)}
                        />
                    </div>
                </CardContent>
            </Card>

            {items.map((item, itemIndex) => (
                <Card key={itemIndex}>
                    <CardHeader className="flex flex-row items-center justify-between gap-4">
                        <CardTitle>Item {itemIndex + 1}</CardTitle>
                        {items.length > 1 && (
                            <Button
                                type="button"
                                variant="destructive"
                                onClick={() => setItems((current) => current.filter((_, index) => index !== itemIndex))}
                            >
                                Remove Item
                            </Button>
                        )}
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="grid gap-6 md:grid-cols-2">
                            <div className="space-y-2">
                                <Label>Category</Label>
                                <Select
                                    value={item.categoryId?.toString()}
                                    onValueChange={(value) => updateItem(itemIndex, { categoryId: Number(value) })}
                                >
                                    <SelectTrigger><SelectValue placeholder="Select category" /></SelectTrigger>
                                    <SelectContent>
                                        {categories.map((category) => (
                                            <SelectItem key={category.id} value={category.id.toString()}>
                                                {category.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label>Expected Delivery Date</Label>
                                <Input
                                    type="date"
                                    value={item.expectedDeliveryDate}
                                    onChange={(event) => updateItem(itemIndex, { expectedDeliveryDate: event.target.value })}
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label>Item Description</Label>
                            <Input
                                value={item.description}
                                onChange={(event) => updateItem(itemIndex, { description: event.target.value })}
                            />
                        </div>

                        <div className="flex items-center gap-3">
                            <Checkbox
                                checked={item.brandingRequired}
                                onCheckedChange={(checked) => updateItem(itemIndex, {
                                    brandingRequired: checked === true,
                                    brandingTypeId: checked === true ? item.brandingTypeId : null,
                                    brandingLocationId: checked === true ? item.brandingLocationId : null,
                                })}
                            />
                            <Label>Branding Required</Label>
                        </div>

                        {item.brandingRequired && (
                            <div className="grid gap-6 rounded-md border p-4 md:grid-cols-2">
                                <div className="space-y-2">
                                    <Label>Branding Type</Label>
                                    <Select
                                        value={item.brandingTypeId?.toString()}
                                        onValueChange={(value) => updateItem(itemIndex, { brandingTypeId: Number(value) })}
                                    >
                                        <SelectTrigger><SelectValue placeholder="Select type" /></SelectTrigger>
                                        <SelectContent>
                                            {brandingTypes.map((type) => (
                                                <SelectItem key={type.id} value={type.id.toString()}>
                                                    {type.display_name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2">
                                    <Label>Branding Location</Label>
                                    <Select
                                        value={item.brandingLocationId?.toString()}
                                        onValueChange={(value) => updateItem(itemIndex, { brandingLocationId: Number(value) })}
                                    >
                                        <SelectTrigger><SelectValue placeholder="Select location" /></SelectTrigger>
                                        <SelectContent>
                                            {brandingLocations.map((location) => (
                                                <SelectItem key={location.id} value={location.id.toString()}>
                                                    {location.display_name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                        )}

                        <div className="space-y-4 border-t pt-6">
                            <div className="flex items-center justify-between">
                                <h3 className="font-semibold">Size Breakdown</h3>
                                <Button type="button" variant="outline" onClick={() => addLineItem(itemIndex)}>
                                    Add Size
                                </Button>
                            </div>
                            {item.lineItems.map((line, lineIndex) => (
                                <div key={lineIndex} className="grid gap-4 sm:grid-cols-[1fr_1fr_auto] sm:items-end">
                                    <div className="space-y-2">
                                        <Label>Size</Label>
                                        <Input
                                            required
                                            value={line.size}
                                            onChange={(event) => updateLineItem(itemIndex, lineIndex, { size: event.target.value })}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Quantity Ordered</Label>
                                        <Input
                                            required
                                            min={1}
                                            type="number"
                                            value={line.qtyOrdered}
                                            onChange={(event) => updateLineItem(itemIndex, lineIndex, { qtyOrdered: Number(event.target.value) })}
                                        />
                                    </div>
                                    {item.lineItems.length > 1 && (
                                        <Button
                                            type="button"
                                            variant="destructive"
                                            onClick={() => removeLineItem(itemIndex, lineIndex)}
                                        >
                                            Remove
                                        </Button>
                                    )}
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            ))}

            <Button type="button" variant="outline" onClick={() => setItems((current) => [...current, createItem()])}>
                Add Item
            </Button>

            <div className="flex justify-end">
                <Button type="submit" disabled={createMutation.isPending || !canSubmit}>
                    {createMutation.isPending ? "Creating..." : "Create Purchase Order"}
                </Button>
            </div>
        </form>
    );
}
