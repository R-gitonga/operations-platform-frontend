import { useState } from "react";
import { Settings2 } from "lucide-react";

import { usePoSettings } from "@/hooks/usePoSettings";
import { useUpdatePoSettings } from "@/hooks/useUpdatePoSettings";

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

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

const FIELDS: {
    key:
        | "overdue_grace_days"
        | "approaching_window_days"
        | "stalled_after_days"
        | "unresolved_defect_after_days"
        | "alert_sweep_interval_minutes";
    label: string;
    unit: string;
    help: string;
}[] = [
    {
        key: "overdue_grace_days",
        label: "Overdue grace period",
        unit: "days",
        help: "Days after the expected delivery date before a line counts as overdue.",
    },
    {
        key: "approaching_window_days",
        label: "Approaching deadline window",
        unit: "days",
        help: "Days before the expected delivery date that an approaching-deadline alert fires.",
    },
    {
        key: "stalled_after_days",
        label: "Stalled partial delivery",
        unit: "days",
        help: "Days since the last delivery on a partially received line before it's flagged as stalled.",
    },
    {
        key: "unresolved_defect_after_days",
        label: "Unresolved defect",
        unit: "days",
        help: "Days a reported defect can stay open before an alert fires.",
    },
    {
        key: "alert_sweep_interval_minutes",
        label: "Alert sweep interval",
        unit: "minutes",
        help: "How often the background worker checks for overdue, stalled and unresolved items.",
    },
];

export default function PoAlertSettingsCard() {
    const [open, setOpen] = useState(false);

    const [values, setValues] = useState<Record<string, string>>({});

    const { data, isLoading, error } = usePoSettings();

    const updateSettings = useUpdatePoSettings();

    function openSettings() {
        if (data) {
            setValues({
                overdue_grace_days: String(data.overdue_grace_days),
                approaching_window_days: String(data.approaching_window_days),
                stalled_after_days: String(data.stalled_after_days),
                unresolved_defect_after_days: String(
                    data.unresolved_defect_after_days,
                ),
                alert_sweep_interval_minutes: String(
                    data.alert_sweep_interval_minutes,
                ),
            });
        }

        setOpen(true);
    }

    function handleSave() {
        const parsed: Record<string, number> = {};

        for (const field of FIELDS) {
            const value = Number(values[field.key]);

            if (!Number.isInteger(value) || value < 0) {
                return;
            }

            parsed[field.key] = value;
        }

        updateSettings.mutate(
            {
                overdue_grace_days: parsed.overdue_grace_days,
                approaching_window_days: parsed.approaching_window_days,
                stalled_after_days: parsed.stalled_after_days,
                unresolved_defect_after_days:
                    parsed.unresolved_defect_after_days,
                alert_sweep_interval_minutes:
                    parsed.alert_sweep_interval_minutes,
            },
            {
                onSuccess: () => setOpen(false),
            },
        );
    }

    return (
        <Card>
            <CardHeader>
                <div className="flex items-center justify-between gap-4">
                    <CardTitle>Purchase Order Alerts</CardTitle>

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
                        Unable to load Purchase Order alert settings.
                    </p>
                ) : (
                    <div className="flex items-center justify-between gap-6">
                        <div className="space-y-1 text-sm text-slate-600">
                            <p>
                                Overdue after{" "}
                                <strong>{data.overdue_grace_days}d</strong>,
                                approaching within{" "}
                                <strong>{data.approaching_window_days}d</strong>
                            </p>
                            <p>
                                Stalled after{" "}
                                <strong>{data.stalled_after_days}d</strong>,
                                defect unresolved after{" "}
                                <strong>
                                    {data.unresolved_defect_after_days}d
                                </strong>
                            </p>
                            <p className="text-xs text-slate-500">
                                Sweep runs every{" "}
                                {data.alert_sweep_interval_minutes} minutes.
                            </p>
                        </div>

                        <Dialog open={open} onOpenChange={setOpen}>
                            <DialogTrigger asChild>
                                <Button variant="outline" onClick={openSettings}>
                                    Configure
                                </Button>
                            </DialogTrigger>

                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>
                                        Purchase Order Alert Settings
                                    </DialogTitle>

                                    <DialogDescription>
                                        Configure the thresholds the
                                        background worker uses for
                                        time-based Purchase Order alerts.
                                    </DialogDescription>
                                </DialogHeader>

                                <div className="space-y-4 py-4">
                                    {FIELDS.map((field) => (
                                        <div
                                            key={field.key}
                                            className="space-y-1"
                                        >
                                            <Label htmlFor={field.key}>
                                                {field.label}
                                            </Label>

                                            <div className="flex items-center gap-3">
                                                <Input
                                                    id={field.key}
                                                    type="number"
                                                    min={field.key === "alert_sweep_interval_minutes" ? 1 : 0}
                                                    step={1}
                                                    value={values[field.key] ?? ""}
                                                    onChange={(event) =>
                                                        setValues((prev) => ({
                                                            ...prev,
                                                            [field.key]:
                                                                event.target.value,
                                                        }))
                                                    }
                                                />

                                                <span className="text-sm text-slate-500">
                                                    {field.unit}
                                                </span>
                                            </div>

                                            <p className="text-xs text-slate-500">
                                                {field.help}
                                            </p>
                                        </div>
                                    ))}
                                </div>

                                {updateSettings.isError && (
                                    <p className="text-sm text-red-600">
                                        Unable to update the settings.
                                        Please try again.
                                    </p>
                                )}

                                <DialogFooter>
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={() => setOpen(false)}
                                        disabled={updateSettings.isPending}
                                    >
                                        Cancel
                                    </Button>

                                    <Button
                                        type="button"
                                        onClick={handleSave}
                                        disabled={updateSettings.isPending}
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