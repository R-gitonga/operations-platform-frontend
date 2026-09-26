import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import { usePoProcurementTimeline } from "@/hooks/usePoProcurementTimeline";

import AddPoItemNoteDialog from "./AddPoItemNoteDialog";

import type { PoProcurementEvent } from "@/types/purchaseOrder";

interface Props {
    poItemId: number;
    purchaseOrderId: number;
}

const RESOLUTION_LABELS: Record<string, string> = {
    replaced: "Replaced by supplier",
    returned_for_credit: "Returned for credit",
    written_off: "Written off",
    accepted: "Accepted after inspection",
};

function borderColorFor(event: PoProcurementEvent) {

    if (event.event_type === "receipt") {
        return "border-blue-500";
    }

    if (event.event_type === "defect") {
        return event.defect_status === "open"
            ? "border-red-500"
            : "border-emerald-500";
    }

    return "border-slate-400";
}

export default function ProcurementTimelineCard({
    poItemId,
    purchaseOrderId,
}: Props) {

    const {
        data: events = [],
        isLoading,
    } = usePoProcurementTimeline(poItemId);

    return (

        <Card>

            <CardHeader className="flex flex-row items-center justify-between">

                <CardTitle>
                    Procurement Timeline
                </CardTitle>

                <AddPoItemNoteDialog
                    poItemId={poItemId}
                    purchaseOrderId={purchaseOrderId}
                />

            </CardHeader>

            <CardContent>

                {isLoading && (
                    <p>Loading timeline...</p>
                )}

                {!isLoading && events.length === 0 && (
                    <p className="text-sm text-slate-500">
                        No activity recorded yet.
                    </p>
                )}

                <div className="space-y-6">

                    {events.map((event) => (

                        <div
                            key={event.id}
                            className={`border-l-4 pl-4 ${borderColorFor(event)}`}
                        >

                            <div className="flex items-center justify-between">

                                <h4 className="font-semibold">
                                    {event.event_type === "note" && "Note"}

                                    {event.event_type === "receipt" &&
                                        `Delivery${event.size ? ` — ${event.size}` : ""}`}

                                    {event.event_type === "defect" &&
                                        `Defect${event.size ? ` — ${event.size}` : ""}`}
                                </h4>

                                <span className="text-xs text-slate-500">
                                    {new Date(event.changed_at).toLocaleString()}
                                </span>

                            </div>

                            <p className="text-sm text-slate-600">
                                {event.event_type === "receipt"
                                    ? `Received by ${event.changed_by}`
                                    : event.event_type === "defect"
                                        ? `Reported by ${event.changed_by}`
                                        : `Added by ${event.changed_by}`}
                            </p>

                            {event.event_type === "note" && (
                                <p className="mt-2 rounded bg-slate-100 p-2 text-sm">
                                    {event.note}
                                </p>
                            )}

                            {event.event_type === "receipt" && (
                                <p className="mt-2 rounded bg-blue-50 p-2 text-sm text-blue-900">
                                    Delivered {event.qty_delivered} — total delivered
                                    to date {event.total_delivered_to_date}, balance{" "}
                                    {event.delivered_balance}.
                                    {event.delivery_note_reference
                                        ? ` Delivery Note: ${event.delivery_note_reference}.`
                                        : ""}
                                </p>
                            )}

                            {event.event_type === "defect" && (
                                <p
                                    className={`mt-2 rounded p-2 text-sm ${
                                        event.defect_status === "open"
                                            ? "bg-red-50 text-red-900"
                                            : "bg-emerald-50 text-emerald-900"
                                    }`}
                                >
                                    {event.qty_defective} unit(s) — {event.reason}

                                    {event.defect_status === "resolved" && (
                                        <>
                                            {" "}
                                            — Resolved as{" "}
                                            {event.resolution_type
                                                ? RESOLUTION_LABELS[event.resolution_type] ??
                                                  event.resolution_type
                                                : "resolved"}
                                            {event.resolution_notes
                                                ? ` (${event.resolution_notes})`
                                                : ""}
                                            .
                                        </>
                                    )}
                                </p>
                            )}

                        </div>

                    ))}

                </div>

            </CardContent>

        </Card>

    );
}