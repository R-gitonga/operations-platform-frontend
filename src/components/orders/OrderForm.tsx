import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "../ui/button";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import type { OrderFormData } from "@/types/orderForm";
import type { Category } from "@/types/category";
import AddCategoryDialog from "../categories/AddCategoryDialog";


interface OrderFormProps {
    form: OrderFormData;
    setForm: React.Dispatch<
        React.SetStateAction<OrderFormData>
    >;
    categories: Category[];
    // setCategories: React.Dispatch<React.SetStateAction<Category[]>>;
}

export default function OrderForm({
    form,
    setForm,
    categories,
    // setCategories
}: OrderFormProps) {
    return (
        <div className="rounded-lg border bg-white p-6 shadow-sm">
            <h2 className="mb-6 text-xl font-semibold">
                Order Information
            </h2>

            <div className="space-y-2">

                <div className="flex items-center justify-between">
                    <Label>Category</Label>

                    <AddCategoryDialog
                        onCreated={(category) => {
                            // setCategories((prev) => [...prev, category]);

                            setForm({
                                ...form,
                                category_id: category.id,
                            });
                        }
                        }
                    />

                </div>

                <Select
                    value={form.category_id?.toString()}
                    onValueChange={(value) =>
                        setForm({
                            ...form,
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
                    <Label>Date Signed</Label>

                    <Input
                        type="date"
                        value={form.date_signed}
                        onChange={(e) =>
                            setForm({
                                ...form,
                                date_signed: e.target.value,
                            })
                        }
                    />
                </div>

                <div>
                    <Label>WSO Number</Label>

                    <Input
                        value={form.wso_number}
                        onChange={(e) =>
                            setForm({
                                ...form,
                                wso_number: e.target.value,
                            })
                        }
                    />
                </div>

                <div>
                    <Label>REQ Number</Label>

                    <Input
                        value={form.req_number}
                        onChange={(e) =>
                            setForm({
                                ...form,
                                req_number: e.target.value,
                            })
                        }
                    />
                </div>

                <div>
                    <Label>Design Code</Label>

                    <Input
                        value={form.design_code}
                        onChange={(e) =>
                            setForm({
                                ...form,
                                design_code: e.target.value,
                            })
                        }
                    />
                </div>

                <div>
                    <Label>Fabric Code</Label>

                    <Input
                        value={form.fabric_code}
                        onChange={(e) =>
                            setForm({
                                ...form,
                                fabric_code: e.target.value,
                            })
                        }
                    />
                </div>
            </div>

            <div className="mt-6">
                <Label>Description</Label>

                <Input
                    value={form.description}
                    onChange={(e) =>
                        setForm({
                            ...form,
                            description: e.target.value,
                        })
                    }
                />
            </div>

            <div className="mt-6">
                <Label>Remarks</Label>

                <Textarea
                    rows={4}
                    value={form.remarks}
                    onChange={(e) =>
                        setForm({
                            ...form,
                            remarks: e.target.value,
                        })
                    }
                />
            </div>
        </div>
    );
}

