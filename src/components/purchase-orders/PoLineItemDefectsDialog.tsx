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
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

import { usePoDefects } from "@/hooks/usePoDefects";
import { useReportPoDefect } from "@/hooks/useReportPoDefect";
import { useResolvePoDefect } from "@/hooks/useResolvePoDefect";

import type { PoLineItemDetail } from "@/types/purchaseOrder";
import type { ReactNode } from "react";

const RESOLUTION_OPTIONS: { value: string; label: string }[] = [
    { value: "replaced", label: "Replaced by supplier" },
    { value: "returned_for_credit", label: "Returned for credit" },
    { value: "written_off", label: "Written off" },
    { value: "accepted", label: "Accepted after inspection" },
];

interface ResolveFormProps {
    defectId: number;
    poLineItemId: number;
    purchaseOrderId: number;
}

function ResolveDefectForm({
    defectId,
    poLineItemId,
    purchaseOrderId,
}: ResolveFormProps) {

    const [resolutionType, setResolutionType] = useState("");
    const [resolutionNotes, setResolutionNotes] = useState("");

    const mutation = useResolvePoDefect();

    function handleResolve() {

        if (!resolutionType) {
            return;
        }

        mutation.mutate({
            defectId,
            poLineItemId,
            purchaseOrderId,
            payload: {
                resolution_type: resolutionType as
                    | "replaced"
                    | "returned_for_credit"
                    | "written_off"
                    | "accepted",
                resolution_notes: resolutionNotes || undefined,
            },
        });
    }

    return (
        <div className="mt-3 flex flex-wrap items-end gap-2 border-t pt-3">

            <div className="min-w-[180px] space-y-1">
                <Label className="text-xs">Resolution</Label>

                <Select value={resolutionType} onValueChange={setResolutionType}>
                    <SelectTrigger>
                        <SelectValue placeholder="Select resolution" />
                    </SelectTrigger>

                    <SelectContent>
                        {RESOLUTION_OPTIONS.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                                {option.label}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            <div className="min-w-[180px] flex-1 space-y-1">
                <Label className="text-xs">Notes</Label>

                <Input
                    value={resolutionNotes}
                    onChange={(e) => setResolutionNotes(e.target.value)}
                />
            </div>

            <Button
                size="sm"
                onClick={handleResolve}
                disabled={!resolutionType || mutation.isPending}
            >
                {mutation.isPending ? "Resolving" : "Resolve"}
            </Button>

        </div>
    );
}

interface Props {
    line: PoLineItemDetail;
    purchaseOrderId: number;
    trigger?: ReactNode;
}

export default function PoLineItemDefectsDialog({
    line,
    purchaseOrderId,
    trigger,
}: Props) {

    const [open, setOpen] = useState(false);
    const [showReportForm, setShowReportForm] = useState(false);

    const [qtyDefective, setQtyDefective] = useState(0);
    const [reason, setReason] = useState("");

    const { data: defects, isLoading } = usePoDefects(line.id);
    const reportMutation = useReportPoDefect();

    const maxReportable = line.total_delivered - line.total_defective;

    function handleReport() {
        reportMutation.mutate(
            {
                poLineItemId: line.id,
                purchaseOrderId,
                payload: {
                    qty_defective: qtyDefective,
                    reason,
                },
            },
            {
                onSuccess: () => {
                    setQtyDefective(0);
                    setReason("");
                    setShowReportForm(false);
                },
            },
        );
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>

            <DialogTrigger asChild>
                {trigger ?? (
                    <Button size="sm" variant="outline">
                        Defects
                        {line.total_defective > 0 && ` (${line.total_defective})`}
                    </Button>
                )}
            </DialogTrigger>

            <DialogContent className="sm:max-w-lg">

                <DialogHeader>
                    <DialogTitle>Defects — {line.size}</DialogTitle>
                </DialogHeader>

                <div className="space-y-4">

                    {isLoading && (
                        <p className="text-sm text-slate-500">Loading defects...</p>
                    )}

                    {!isLoading && (!defects || defects.length === 0) && (
                        <p className="text-sm text-slate-500">
                            No defects reported for this line.
                        </p>
                    )}

                    <div className="max-h-64 space-y-3 overflow-y-auto">

                        {defects?.map((defect) => (

                            <div key={defect.id} className="rounded-md border p-3">

                                <div className="flex items-center justify-between">

                                    <span className="text-sm font-medium">
                                        {defect.qty_defective} unit(s)
                                    </span>

                                    <Badge
                                        variant={
                                            defect.status === "open"
                                                ? "destructive"
                                                : "secondary"
                                        }
                                    >
                                        {defect.status}
                                    </Badge>

                                </div>

                                <p className="mt-1 text-sm text-slate-600">
                                    {defect.reason}
                                </p>

                                {defect.status === "resolved" && (
                                    <p className="mt-1 text-xs text-slate-500">
                                        Resolved as{" "}
                                        {RESOLUTION_OPTIONS.find(
                                            (o) => o.value === defect.resolution_type,
                                        )?.label ?? defect.resolution_type}
                                        {defect.resolution_notes
                                            ? ` — ${defect.resolution_notes}`
                                            : ""}
                                    </p>
                                )}

                                {defect.status === "open" && (
                                    <ResolveDefectForm
                                        defectId={defect.id}
                                        poLineItemId={line.id}
                                        purchaseOrderId={purchaseOrderId}
                                    />
                                )}

                            </div>

                        ))}

                    </div>

                    <div className="border-t pt-4">

                        {!showReportForm ? (

                            <Button
                                variant="outline"
                                size="sm"
                                disabled={maxReportable <= 0}
                                onClick={() => setShowReportForm(true)}
                            >
                                Report New Defect
                            </Button>

                        ) : (

                            <div className="space-y-3">

                                <div className="space-y-1">
                                    <Label>Quantity Defective</Label>

                                    <Input
                                        type="number"
                                        min={1}
                                        max={Math.max(maxReportable, 0)}
                                        value={qtyDefective}
                                        onChange={(e) =>
                                            setQtyDefective(Number(e.target.value))
                                        }
                                    />
                                </div>

                                <div className="space-y-1">
                                    <Label>Reason</Label>

                                    <Textarea
                                        value={reason}
                                        onChange={(e) => setReason(e.target.value)}
                                    />
                                </div>

                                <div className="flex justify-end gap-2">

                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => setShowReportForm(false)}
                                    >
                                        Cancel
                                    </Button>

                                    <Button
                                        size="sm"
                                        onClick={handleReport}
                                        disabled={
                                            reportMutation.isPending ||
                                            qtyDefective <= 0 ||
                                            qtyDefective > maxReportable ||
                                            reason.trim().length === 0
                                        }
                                    >
                                        {reportMutation.isPending
                                            ? "Reporting"
                                            : "Report Defect"}
                                    </Button>

                                </div>

                            </div>

                        )}

                    </div>

                </div>

            </DialogContent>

        </Dialog>
    );
}