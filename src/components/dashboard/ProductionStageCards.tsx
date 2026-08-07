import { Card, CardContent} from "@/components/ui/card";

import type { ProductionStageSummary } from "@/types/dashboard";

interface Props {
    stages: ProductionStageSummary[];

    onStageClick?: (
        stage: ProductionStageSummary,
    ) => void;
}

export default function ProductionStageCards({
    stages,
    onStageClick,
}: Props) {
    return (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

            {stages.map((stage) => (

                <Card
                    key={stage.stage_id}
                    onClick={() => {
                        console.log("Card Clicked", stage.stage_name);
                        onStageClick?.(stage);
                    }}
                    className="cursor-pointer transition-all hover:shadow-md hover:-translate-y-1"
                >
                    <CardContent className="flex items-center gap-4 p-5">

                        <div
                            className="h-12 w-2 rounded-full"
                            style={{
                                backgroundColor:
                                    stage.stage_color,
                            }}
                        />

                        <div className="flex-1">

                            <p className="font-semibold text-slate-900">
                                {stage.stage_name}
                            </p>

                            <p className="text-sm text-slate-500">
                                {stage.item_count} item
                                {stage.item_count === 1 ? "" : "s"}
                                {" "}currently in stage
                            </p>

                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}