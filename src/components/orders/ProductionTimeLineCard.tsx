import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import { useStageHistory } from "@/hooks/useStageHistory";

interface Props {
    wsoId: number;
}

export default function ProductionTimelineCard({
    wsoId,
}: Props) {

    const {
        data: history = [],
        isLoading,
    } = useStageHistory(wsoId);

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

                    {history.map(stage => (

                        <div
                            key={stage.id}
                            className="border-l-4 pl-4"
                            style={{
                                borderColor:
                                    stage.stage_color,
                            }}
                        >

                            <div className="flex items-center justify-between">

                                <h4 className="font-semibold">

                                    {stage.stage_name}

                                </h4>

                                <span className="text-xs text-slate-500">

                                    {new Date(
                                        stage.changed_at,
                                    ).toLocaleString()}

                                </span>

                            </div>

                            <p className="text-sm text-slate-600">

                                Changed by {stage.changed_by}

                            </p>

                            {stage.notes && (

                                <p className="mt-2 rounded bg-slate-100 p-2 text-sm">

                                    {stage.notes}

                                </p>

                            )}

                        </div>

                    ))}

                </div>

            </CardContent>

        </Card>

    );

}