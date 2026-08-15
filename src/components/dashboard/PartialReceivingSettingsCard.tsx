import { useState } from "react";
import { Settings2 } from "lucide-react";

import { usePartialReceivingSettings } from "@/hooks/usePartialReceivingSettings";
import { useUpdatePartialReceivingSettings } from "@/hooks/useUpdatePartialReceivingSettings";

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";

export default function PartialReceivingSettingsCard() {
    const [open, setOpen] = useState(false);
    const [days, setDays] = useState("");

    const {
        data,
        isLoading,
        error,
    } = usePartialReceivingSettings();

    const updateSettings =
        useUpdatePartialReceivingSettings();

    function openSettings() {
        if (data) {
            setDays(String(data.attention_after_days));
        }

        setOpen(true);
    }

    function handleSave() {
        const value = Number(days);

        if (!Number.isInteger(value) || value < 0) {
            return;
        }

        updateSettings.mutate(
            {
                attention_after_days: value,
            },
            {
                onSuccess: () => {
                    setOpen(false);
                },
            }
        );
    }

    return (
        <Card>
            <CardHeader>
                <div className="flex items-center justify-between gap-4">
                    <CardTitle>
                        Partial Receiving
                    </CardTitle>

                    <Settings2 className="h-5 w-5 text-slate-400" />
                </div>
            </CardHeader>

            <CardContent>
                {isLoading ? (
                    <p className="text-sm text-slate-500">
                        Loading settings...
                    </p>
                ) : error || !data ? (
                    <p className="text-sm text-red-600">
                        Unable to load partial receiving settings.
                    </p>
                ) : (
                    <div className="flex items-center justify-between gap-6">
                        <div>
                            <p className="text-sm text-slate-500">
                                Attention threshold
                            </p>

                            <p className="mt-1 text-2xl font-bold">
                                {data.attention_after_days}{" "}
                                {data.attention_after_days === 1
                                    ? "day"
                                    : "days"}
                            </p>

                            <p className="mt-1 text-xs text-slate-500">
                                Partially received products will require
                                attention after this period.
                            </p>
                        </div>

                        <Dialog
                            open={open}
                            onOpenChange={setOpen}
                        >
                            <DialogTrigger asChild>
                                <Button
                                    variant="outline"
                                    onClick={openSettings}
                                >
                                    Configure
                                </Button>
                            </DialogTrigger>

                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>
                                        Partial Receiving Settings
                                    </DialogTitle>

                                    <DialogDescription>
                                        Configure how long a partially
                                        received product can remain
                                        unresolved before it appears in
                                        Attention Required.
                                    </DialogDescription>
                                </DialogHeader>

                                <div className="space-y-2 py-4">
                                    <label
                                        htmlFor="partial-receiving-days"
                                        className="text-sm font-medium"
                                    >
                                        Attention after
                                    </label>

                                    <div className="flex items-center gap-3">
                                        <Input
                                            id="partial-receiving-days"
                                            type="number"
                                            min={0}
                                            step={1}
                                            value={days}
                                            onChange={(event) =>
                                                setDays(
                                                    event.target.value
                                                )
                                            }
                                        />

                                        <span className="text-sm text-slate-500">
                                            days
                                        </span>
                                    </div>

                                    <p className="text-xs text-slate-500">
                                        Set to 0 to require attention
                                        immediately after a partial
                                        receipt.
                                    </p>
                                </div>

                                {updateSettings.isError && (
                                    <p className="text-sm text-red-600">
                                        Unable to update the setting.
                                        Please try again.
                                    </p>
                                )}

                                <DialogFooter>
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={() => setOpen(false)}
                                        disabled={
                                            updateSettings.isPending
                                        }
                                    >
                                        Cancel
                                    </Button>

                                    <Button
                                        type="button"
                                        onClick={handleSave}
                                        disabled={
                                            updateSettings.isPending ||
                                            days === ""
                                        }
                                    >
                                        {updateSettings.isPending
                                            ? "Saving..."
                                            : "Save changes"}
                                    </Button>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}