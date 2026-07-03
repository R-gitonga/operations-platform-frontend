import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

import { useCreateWso } from "@/hooks/useCreateWso";
import { useNavigate } from "react-router-dom";
import { useState, type FormEvent } from "react";


export default function WsoForm() {
    const navigate = useNavigate();
    const createMutation = useCreateWso();
    const [form, setForm] = useState({
        wso_number: "",
        req_number: "",
        description: "",
        remarks: "",

        line_items: [
            {
                size: "",
                quantity: 0,
            },
        ],
    });

    function addLineItem() {
        setForm({
            ...form,
            line_items: [
                ...form.line_items,
                {
                    size: "",
                    quantity: 0,
                },
            ],
        });
    }
    console.log(form);
    async function handleSubmit(
        e: FormEvent<HTMLFormElement>
    ) {
        e.preventDefault();

        createMutation.mutate(form, {
            onSuccess: () => {
                navigate("/orders");
            },

            onError: (error) => {
                console.error(error)
                alert("Failed to create Workshop Order.");
            },
        });
    }
    return (
        <form className="space-y-8" onSubmit={handleSubmit}>
            <div className="rounded-lg border bg-white p-6 shadow-sm">
                <h2 className="mb-6 text-xl font-semibold">
                    Order Information
                </h2>

                <div className="grid gap-6 md:grid-cols-2">
                    <div className="space-y-2">
                        <Label htmlFor="wso_number">
                            Wso Number
                        </Label>

                        <input 
                            id="wso_number" 
                            placeholder="e.g wso-2026-001"
                            value={form.wso_number}
                            onChange={(e) =>
                                setForm({
                                    ...form,
                                    wso_number: e.target.value,
                                })
                            }
                             />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="req_number">
                            REQ Number
                        </Label>

                        <Input 
                            id="req_number" 
                            placeholder="e.g. Req-0232"
                            value={form.req_number}
                            onChange={(e) => 
                                setForm({
                                    ...form,
                                    req_number: e.target.value,
                                })
                            }
                             />
                    </div>

                </div>

                <div className="mt-6 space-y-2">
                    <Label htmlFor="description">
                            Description
                    </Label>

                    <Input 
                        id="description" 
                        placeholder="e.g. Black Classic Trouser"
                        value={form.description}
                            onChange={(e) => 
                                setForm({
                                    ...form,
                                    description: e.target.value,
                                })
                            }
                        />

                </div>
                        
                <div className="mt-6 space-y-2">
                    <Label htmlFor="remarks">
                        remarks
                    </Label>

                    <Textarea 
                        id="remarks"
                        rows={4} 
                        placeholder="e.g. Cutting"
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
                
            <div className="rounded-lg border bg-white p-6 shadow-sm">
                <h2 className="mb-4 text-xl font-semibold">
                    Line Items
                </h2>

                <div className="space-y-4">
                    {form.line_items.map((item, index) => (
                        
                        <div
                            key={index}
                            className="grid grid-cols-[1fr_1fr_auto] gap-4 items-end"
                        >
                            <div className="space-y-2">
                                <Label>Size</Label>
                                <Input 
                                    placeholder="Size"
                                    value={item.size}
                                    onChange={(e) => {
                                        const updatedItems = [...form.line_items];

                                        updatedItems[index].size = e.target.value;

                                        setForm({
                                            ...form,
                                            line_items: updatedItems,
                                        });
                                    }}
                                     />
                            </div>

                            <div className="space-y-2">
                                <Label>Quantity</Label>
                                <Input 
                                    type="number" 
                                    value={item.quantity}
                                    onChange={(e) => {
                                        const updatedItems = [...form.line_items];

                                        updatedItems[index].quantity =
                                            Number(e.target.value);
                                        
                                            setForm({
                                                ...form,
                                                line_items: updatedItems,
                                            });
                                    }}
                                     />
                            </div>

                            <div className="space-y-2">
                                {form.line_items.length > 1 && (
                                    <Button
                                    type="button"
                                    variant="destructive"
                                    onClick={() => {
                                        const updatedItems = form.line_items.filter(
                                            (_, i) => i !== index
                                        );

                                        setForm({
                                            ...form,
                                            line_items: updatedItems,
                                        });
                                    }}
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
                        >+ Add Line Item</Button>
                </div>
            </div>

            <div className="flex justify-end">
                <Button type="submit" disabled={createMutation.isPending}>
                    {createMutation.isPending
                        ? "Creating..."
                        : "Create WSO"
                    }
                </Button>
            </div>
            
        </form>
    );
}