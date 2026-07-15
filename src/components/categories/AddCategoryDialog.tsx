import { useState } from "react";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { useCreateCategory } from "@/hooks/useCreateCategory";

import type { Category } from "@/types/category";

interface AddCategoryDialogProps {
    trigger?: React.ReactNode;
    onCreated?: (category: Category) => void;
}

export default function AddCategoryDialog({
    trigger,
    onCreated,
}: AddCategoryDialogProps) {
    const [open, setOpen] = useState(false);

    const [name, setName] = useState("");

    const mutation = useCreateCategory();

    function handleSave() {
        if (!name.trim()) {
            alert("Category name is required.");
            return;
        }

        mutation.mutate(
            { name },
            {
                onSuccess: (category) => {
                    console.log("SUCCESS");

                    onCreated?.(category);

                    setName("");

                    console.log("closing dialog")

                    setOpen(false);
                    
                },

                onError: (error) => {
                console.error(error);
                alert("Failed to create category.");
                },
            }
        );
    }

    return (

        <Dialog
            open={open}
            onOpenChange={setOpen}
        >
            <DialogTrigger asChild>
                {trigger ?? (
                    <Button
                        type="button"
                        variant="outline"
                    >
                        Add Category
                    </Button>
                )}
            </DialogTrigger>

            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        Create Category
                    </DialogTitle>
                </DialogHeader>

                <div className="space-y-4">
                    <div>
                        <Label>
                            Category Name
                        </Label>
                        <Input
                            value={name}
                            onChange={(e) => 
                                setName(e.target.value)
                            }
                        />
                    </div>

                    <div className="flex justify-end">
                        <Button
                            onClick={handleSave}
                            disabled={mutation.isPending}
                        >
                            {mutation.isPending ? "Saving" : "Save"}
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}