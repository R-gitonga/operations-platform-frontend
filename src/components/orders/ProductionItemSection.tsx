import {
    Card,
    CardContent,
} from "@/components/ui/card";

import type { WsoItemDetail } from "@/types/wso";

import ProductHeader from "./ProductHeader";
import ProductionItemSummaryCard from "./ProductionItemSummaryCard";
import ProductionTimelineCard from "./ProductionTimeLineCard";
import LineItemsTable from "./SizeBreakdownCard";

interface Props {
    item: WsoItemDetail;
    wsoStatus: string;
    wsoId: number;
}

export default function ProductionItemSection({
    item,
    wsoStatus,
    wsoId,
}: Props) {
    return (

        <Card className="overflow-hidden">

            <CardContent className="space-y-8 p-6">

                <ProductHeader
                    item={item}
                />

                <div className="grid gap-6 lg:grid-cols-2">

                    <ProductionItemSummaryCard
                        item={item}
                        wsoId={wsoId}
                    />

                    <ProductionTimelineCard
                        wsoItemId={item.id}
                    />

                </div>

                <LineItemsTable
                    item={item}
                    wsoStatus={wsoStatus}
                />

            </CardContent>

        </Card>

    );
}