import { AlertTriangle, ArrowRight } from "lucide-react";

import {
    Card,
    CardContent,
} from "@/components/ui/card";

import type {
    PartialReceivingAttentionItem,
} from "@/types/partialReceiving";

interface Props {
    items: PartialReceivingAttentionItem[];

    onItemClick?: (
        item: PartialReceivingAttentionItem,
    ) => void;
}

function formatDate(value: string): string {
    return new Date(value).toLocaleDateString();
}

export default function PartialReceivingAttention({
    items,
    onItemClick,
}: Props) {

    if (items.length === 0) {
        return (
            <Card>
                <CardContent className="flex items-center gap-4 p-6">

                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100">
                        <AlertTriangle className="h-5 w-5 text-green-600" />
                    </div>

                    <div>
                        <p className="font-semibold text-slate-900">
                            No partial receipts require attention
                        </p>

                        <p className="text-sm text-slate-500">
                            All partially received products are currently
                            within their attention period.
                        </p>
                    </div>

                </CardContent>
            </Card>
        );
    }

    return (
        <Card>
            <CardContent className="p-0">

                <div className="divide-y">

                    {items.map((item) => (

                        <button
                            key={item.tracking_id}
                            type="button"
                            onClick={() =>
                                onItemClick?.(item)
                            }
                            className="w-full text-left transition hover:bg-slate-50"
                        >

                            <div className="flex items-center gap-4 p-5">

                                {/* Attention indicator */}

                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-amber-100">
                                    <AlertTriangle className="h-5 w-5 text-amber-600" />
                                </div>

                                {/* Main information */}

                                <div className="min-w-0 flex-1">

                                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1">

                                        <p className="font-semibold text-slate-900">
                                            {item.description}
                                        </p>

                                        <span className="text-sm text-slate-500">
                                            WSO {item.wso_number}
                                        </span>

                                    </div>

                                    <div className="mt-1 flex flex-wrap gap-x-4 gap-y-1 text-sm">

                                        <span className="text-slate-600">
                                            Outstanding:{" "}
                                            <strong>
                                                {item.outstanding_quantity}
                                            </strong>
                                        </span>

                                        <span className="text-slate-500">
                                            Partially received since{" "}
                                            {formatDate(
                                                item.first_partial_received_at,
                                            )}
                                        </span>

                                    </div>

                                    <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-500">

                                        <span>
                                            Attention after:{" "}
                                            {item.attention_after_days} days
                                        </span>

                                        <span>
                                            Outstanding for:{" "}
                                            {item.elapsed_days} days
                                        </span>

                                    </div>

                                </div>

                                {/* Overdue information */}

                                <div className="hidden shrink-0 items-center gap-3 sm:flex">

                                    <div className="text-right">

                                        <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                                            Overdue
                                        </p>

                                        <p className="font-bold text-red-600">
                                            {item.overdue_days}{" "}
                                            {item.overdue_days === 1
                                                ? "day"
                                                : "days"}
                                        </p>

                                    </div>

                                    <ArrowRight className="h-5 w-5 text-slate-400" />

                                </div>

                            </div>

                            {/* Mobile overdue indicator */}

                            <div className="flex items-center justify-between border-t bg-slate-50 px-5 py-2 text-xs sm:hidden">

                                <span className="font-medium text-slate-500">
                                    Overdue
                                </span>

                                <span className="font-bold text-red-600">
                                    {item.overdue_days}{" "}
                                    {item.overdue_days === 1
                                        ? "day"
                                        : "days"}
                                </span>

                            </div>

                        </button>

                    ))}

                </div>

            </CardContent>
        </Card>
    );
}