import { Progress } from "@/components/ui/progress";
import {
    CheckCircle2,
    Clock3,
} from "lucide-react";

interface Props {
    title: string;
    value: number;
    total: number;
}

export default function ProgressStat({
    title,
    value,
    total,
}: Props) {

    const percent =
        total === 0
            ? 0
            : Math.round((value / total) * 100);

    const remaining = total - value;

    return (
        <div className="space-y-6">

            <div>

                <div className="flex items-center justify-between mb-2">

                    <span className="font-medium">
                        {title}
                    </span>

                    <span className="font-semibold">
                        {percent}%
                    </span>

                </div>

                <Progress
                    value={percent}
                    className="h-3"
                />

            </div>

            <div className="grid grid-cols-3 gap-6">

                <div>

                    <p className="text-xs text-slate-500">
                        Raised
                    </p>

                    <p className="text-2xl font-bold">
                        {total}
                    </p>

                </div>

                <div>

                    <div className="flex items-center gap-2 text-green-600">

                        <CheckCircle2 size={16} />

                        <span className="text-xs">
                            Received
                        </span>

                    </div>

                    <p className="text-2xl font-bold">
                        {value}
                    </p>

                </div>

                <div>

                    <div className="flex items-center gap-2 text-orange-500">

                        <Clock3 size={16} />

                        <span className="text-xs">
                            Remaining
                        </span>

                    </div>

                    <p className="text-2xl font-bold">
                        {remaining}
                    </p>

                </div>

            </div>

        </div>
    );
}