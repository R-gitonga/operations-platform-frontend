import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import { useProductionItemStageHistory  } from "@/hooks/useProductionItemStageHistory";

interface Props {
    wsoItemId: number;
}

export default function ProductionTimelineCard({
    wsoItemId,
}: Props) {

    const {
        data: history = [],
        isLoading,
    } = useProductionItemStageHistory (wsoItemId);

    return (

        <Card>

            <CardHeader>

                <CardTitle>

                    Production Timeline

                </CardTitle>

            </CardHeader>

            <CardContent>

                {isLoading && (
                    <p>Loading timeline...</p>
                )}

                {!isLoading && history.length === 0 && (
                    <p className="text-sm text-slate-500">
                        No production history yet.
                    </p>
                )}

                <div className="space-y-6">

                    {history.map(event => (

                        <div
                            key={event.id}
                            className="border-l-4 pl-4"
                            style={{
                                borderColor:
                                    event.stage_color,
                            }}
                        >

                            <div className="flex items-center justify-between">

                                <h4 className="font-semibold">

                                    {event.stage_name}

                                </h4>

                                <span className="text-xs text-slate-500">

                                    {new Date(
                                        event.changed_at,
                                    ).toLocaleString()}

                                </span>

                            </div>

                            <p className="text-sm text-slate-600">

                                {event.event_type === "partial_received"
                                    ? `Received by ${event.changed_by}`
                                    : `Changed by ${event.changed_by}`}

                            </p>

                            {event.event_type === "partial_received" && (

                                <p className="mt-2 rounded bg-amber-50 p-2 text-sm text-amber-900">

                                    Received {event.quantity_received} of{" "}
                                    {event.total_raised} raised — {event.balance}{" "}
                                    remaining.

                                </p>

                            )}

                            {event.notes && (

                                <p className="mt-2 rounded bg-slate-100 p-2 text-sm">

                                    {event.notes}

                                </p>

                            )}

                        </div>

                    ))}

                </div>

            </CardContent>

        </Card>

    );

}