import { AlertTriangle, ArrowRight } from "lucide-react";

import {
    Card,
    CardContent,
} from "@/components/ui/card";

import type { AttentionRequiredItem } from "@/types/dashboard";

interface Props {
    items: AttentionRequiredItem[];

    onItemClick?: (
        item: AttentionRequiredItem,
    ) => void;
}

function formatDuration(hours: number): string {
    const totalMinutes = Math.max(
        0,
        Math.round(hours * 60),
    );

    const days = Math.floor(
        totalMinutes / (60 * 24),
    );

    const remainingAfterDays =
        totalMinutes % (60 * 24);

    const wholeHours = Math.floor(
        remainingAfterDays / 60,
    );

    const minutes = remainingAfterDays % 60;

    if (days > 0) {
        return `${days}d ${wholeHours}h ${minutes}m`;
    }

    if (wholeHours > 0) {
        return `${wholeHours}h ${minutes}m`;
    }

    return `${minutes}m`;
}

export default function AttentionRequired({
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
                            All caught up
                        </p>

                        <p className="text-sm text-slate-500">
                            No production items currently require attention.
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
                            key={item.wso_item_id}
                            type="button"
                            onClick={() =>
                                onItemClick?.(item)
                            }
                            className="w-full text-left transition hover:bg-slate-50"
                        >

                            <div className="flex items-center gap-4 p-5">

                                {/* Stage indicator */}

                                <div
                                    className="h-12 w-1.5 shrink-0 rounded-full"
                                    style={{
                                        backgroundColor:
                                            item.current_stage_color,
                                    }}
                                />

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

                                    <p className="mt-1 text-sm font-medium">
                                        {item.current_stage_name}
                                    </p>

                                    <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-500">

                                        <span>
                                            Expected:{" "}
                                            {item.expected_duration_hours !== null
                                                ? `${item.expected_duration_hours}h`
                                                : "Not set"}
                                        </span>

                                        <span>
                                            In stage:{" "}
                                            {formatDuration(
                                                item.elapsed_hours,
                                            )}
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
                                            {formatDuration(
                                                item.overdue_hours,
                                            )}
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
                                    {formatDuration(
                                        item.overdue_hours,
                                    )}
                                </span>

                            </div>

                        </button>

                    ))}

                </div>

            </CardContent>
        </Card>
    );
}