import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import type { LucideIcon } from "lucide-react";

interface Props {
    title: string;
    value: number | string;
    icon: LucideIcon;
    color?: string;
    onClick?: () => void;
}

export default function KpiCard({
    title,
    value,
    icon: Icon,
    color = "text-slate-600",
    onClick,
}: Props) {
    return (

        <Card
            onClick={onClick}
            className={`
                transition-all
                hover:shadow-lg
                hover:-translate-y-1
                cursor-pointer
                `}
        >
            <CardHeader className="flex flex-row items-center justify-between pb-2">

                <CardTitle className="text-sm text-slate-500">
                    {title}
                </CardTitle>

                <Icon className={`h-5 w-5 ${color}`} />

            </CardHeader>

            <CardContent>

                <p className="text-3xl font-bold">
                    {value}
                </p>
            </CardContent>
        </Card>
    );
}