import {
    PieChart,
    Pie,
    Cell,
    ResponsiveContainer,
    Tooltip,
    Legend,
} from "recharts";

interface Props {
    active: number;
    partial: number;
    completed: number;
    cancelled: number;
}

const COLORS = [
    "#2563eb", // Active
    "#7c3aed", // Partial
    "#16a34a", // Completed
    "#dc2626", // Cancelled
];

export default function OrderStatusChart({
    active,
    partial,
    completed,
    cancelled,
}: Props) {

    const data = [
        {
            name: "Active",
            value: active,
        },
        {
            name: "Partial",
            value: partial,
        },
        {
            name: "Completed",
            value: completed,
        },
        {
            name: "Cancelled",
            value: cancelled,
        },
    ].filter(item => item.value > 0);

    return (
        <div className="h-[320px] w-full">
            <ResponsiveContainer width="100%" height="100%">
                <PieChart>

                    <Pie
                        data={data}
                        dataKey="value"
                        nameKey="name"
                        innerRadius={70}
                        outerRadius={110}
                        paddingAngle={4}
                    >
                        {data.map((_, index) => (
                            <Cell
                                key={index}
                                fill={COLORS[index]}
                            />
                        ))}
                    </Pie>

                    <Tooltip />

                    <Legend />

                </PieChart>
            </ResponsiveContainer>
        </div>
    );
}