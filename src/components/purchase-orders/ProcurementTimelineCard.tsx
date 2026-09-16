import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import { usePoItemNotes } from "@/hooks/usePoItemNotes";

import AddPoItemNoteDialog from "./AddPoItemNoteDialog";

interface Props {
    poItemId: number;
    purchaseOrderId: number;
}

// Once po_receipts/po_defects exist, this becomes a genuinely
// merged feed (notes + receipts + defects, sorted by timestamp) —
// the same shape ProductionTimelineCard already uses for
// stage-change + partial-received events. For now, notes are the
// only event source, so the card renders them directly.
export default function ProcurementTimelineCard({
    poItemId,
    purchaseOrderId,
}: Props) {

    const {
        data: notes = [],
        isLoading,
    } = usePoItemNotes(poItemId);

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

                {!isLoading && notes.length === 0 && (
                    <p className="text-sm text-slate-500">
                        No activity recorded yet.
                    </p>
                )}

                <div className="space-y-6">

                    {notes.map((note) => (

                        <div
                            key={note.id}
                            className="border-l-4 border-slate-400 pl-4"
                        >

                            <div className="flex items-center justify-between">

                                <h4 className="font-semibold">
                                    Note
                                </h4>

                                <span className="text-xs text-slate-500">
                                    {new Date(note.created_at).toLocaleString()}
                                </span>

                            </div>

                            <p className="text-sm text-slate-600">
                                Added by {note.created_by}
                            </p>

                            <p className="mt-2 rounded bg-slate-100 p-2 text-sm">
                                {note.note}
                            </p>

                        </div>

                    ))}

                </div>

            </CardContent>

        </Card>

    );
}