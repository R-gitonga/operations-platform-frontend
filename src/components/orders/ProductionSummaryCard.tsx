import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import type { WsoDetail } from "@/types/wso";

interface Props {
    order: WsoDetail;
}

function SummaryRow({
    label,
    value,
}: {
    label: string,
    value: number;
}) {
    return (
        <div className="flex items-center justify-between border-b py-3 last:border-b-0">
            <span className="font-medium text-slate-600">
                {label}
            </span>

            <span className="font-semibold">
                {value}
            </span>
        </div>
    );
}

export default function ProductionSummaryCard({
    order,
}: Props) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>
                    Production Summary
                </CardTitle>
            </CardHeader>

            <CardContent>
                <SummaryRow
                    label="Line Items"
                    value={order.line_item_count}
                />

                <SummaryRow
                    label="Qty Raised"
                    value={order.total_qty_raised}
                />

                <SummaryRow
                    label="Qty Received"
                    value={order.total_qty_received}
                />

                <SummaryRow
                    label="Balance"
                    value={order.total_balance}
                />

            </CardContent>
        </Card>
    );
}