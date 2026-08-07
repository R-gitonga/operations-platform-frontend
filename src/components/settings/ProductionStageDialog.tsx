import { useEffect, useState } from "react";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

import type { ProductionStage } from "@/types/productionStage";

import { useCreateProductionStage } from "@/hooks/useCreateProductionStage";
import { useUpdateProductionStage } from "@/hooks/useUpdateProductionStage";

interface ProductionStageDialogProps {
    open: boolean;

    onOpenChange: (open: boolean) => void;

    stage?: ProductionStage;
}

export default function ProductionStageDialog({
    open,
    onOpenChange,
    stage,
}: ProductionStageDialogProps) {

    const [code, setCode] = useState("");

    const [displayName, setDisplayName] = useState("");

    const [displayOrder, setDisplayOrder] = useState(1);

    const [color, setColor] = useState("#3b82f6");

    const [expectedDurationHours, setExpectedDurationHours] =
        useState("");

    const [attentionEnabled, setAttentionEnabled] =
        useState(true);

    const createStage = useCreateProductionStage();

    const updateStage = useUpdateProductionStage();

    useEffect(() => {

        if (!open) {
            return;
        }

        if (stage) {

            setCode(stage.code);

            setDisplayName(stage.display_name);

            setDisplayOrder(stage.display_order);

            setColor(stage.color);

            setExpectedDurationHours(
                stage.expected_duration_hours?.toString() ?? ""
            );

            setAttentionEnabled(stage.attention_enabled);

        } else {

            setCode("");

            setDisplayName("");

            setDisplayOrder(1);

            setColor("#3b82f6");

            setExpectedDurationHours("");

            setAttentionEnabled(true);

        }

    }, [stage, open]);

    async function handleSubmit() {

        const request = {

            code,

            display_name: displayName,

            display_order: displayOrder,

            color,

            expected_duration_hours:
                expectedDurationHours === ""
                    ? null
                    : Number(expectedDurationHours),

            attention_enabled: attentionEnabled,

        };

        if (stage) {

            await updateStage.mutateAsync({

                id: stage.id,

                request,

            });

        } else {

            await createStage.mutateAsync(request);

        }

        onOpenChange(false);
    }

    const isSaving =
        createStage.isPending || updateStage.isPending;

    return (

        <Dialog
            open={open}
            onOpenChange={onOpenChange}
        >

            <DialogContent className="sm:max-w-xl">

                <DialogHeader>

                    <DialogTitle>

                        {stage
                            ? "Edit Production Stage"
                            : "Create Production Stage"}

                    </DialogTitle>

                    <DialogDescription>

                        Configure how products move through production.

                    </DialogDescription>

                </DialogHeader>

                <div className="space-y-5 py-2">

                    <div className="space-y-2">

                        <Label>Stage Code</Label>

                        <Input
                            value={code}
                            onChange={(e) =>
                                setCode(e.target.value)
                            }
                        />

                    </div>

                    <div className="space-y-2">

                        <Label>Display Name</Label>

                        <Input
                            value={displayName}
                            onChange={(e) =>
                                setDisplayName(e.target.value)
                            }
                        />

                    </div>

                    <div className="space-y-2">

                        <Label>Workflow Order</Label>

                        <Input
                            type="number"
                            value={displayOrder}
                            onChange={(e) =>
                                setDisplayOrder(
                                    Number(e.target.value)
                                )
                            }
                        />

                    </div>

                    <div className="space-y-2">

                        <Label>Colour</Label>

                        <Input
                            type="color"
                            value={color}
                            onChange={(e) =>
                                setColor(e.target.value)
                            }
                        />

                    </div>

                    <div className="space-y-2">

                        <Label>
                            Expected Duration (Hours)
                        </Label>

                        <Input
                            type="number"
                            value={expectedDurationHours}
                            onChange={(e) =>
                                setExpectedDurationHours(
                                    e.target.value
                                )
                            }
                        />

                    </div>

                    <div className="flex items-center justify-between rounded-md border p-4">

                        <div>

                            <p className="font-medium">

                                Attention Required

                            </p>

                            <p className="text-sm text-slate-500">

                                Raise alerts when products exceed
                                the expected duration.

                            </p>

                        </div>

                        <Switch
                            checked={attentionEnabled}
                            onCheckedChange={
                                setAttentionEnabled
                            }
                        />

                    </div>

                </div>

                <DialogFooter>

                    <Button
                        variant="outline"
                        onClick={() =>
                            onOpenChange(false)
                        }
                    >
                        Cancel
                    </Button>

                    <Button
                        onClick={handleSubmit}
                        disabled={isSaving}
                    >

                        {isSaving
                            ? "Saving..."
                            : stage
                                ? "Save Changes"
                                : "Create Stage"}

                    </Button>

                </DialogFooter>

            </DialogContent>

        </Dialog>

    );

}