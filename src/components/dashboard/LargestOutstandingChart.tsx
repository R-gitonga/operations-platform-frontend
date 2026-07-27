import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    Cell,
} from "recharts";

import { useNavigate } from "react-router-dom";

interface OutstandingOrder {
    id: number;
    wso_number: string;
    outstanding_qty: number;
}

interface Props {
    data: OutstandingOrder[];
}

export default function LargestOutstandingChart({
    data,
}: Props) {

    const navigate = useNavigate();

    return (
        <ResponsiveContainer
            width="100%"
            height={320}
        >
            <BarChart
                data={data}
                layout="vertical"
                margin={{
                    top: 5,
                    right: 20,
                    left: 20,
                    bottom: 5,
                }}
            >
                <XAxis
                    type="number"
                />

                <YAxis
                    dataKey="wso_number"
                    type="category"
                    width={100}
                />

                <Tooltip />

                <Bar
                    dataKey="outstanding_qty"
                    radius={[0, 6, 6, 0]}
                    onClick={(entry) =>
                        navigate(`/orders/${entry.id}`)
                    }
                >
                    {data.map((_, index) => (
                        <Cell
                            key={index}
                            cursor="pointer"
                        />
                    ))}
                </Bar>

            </BarChart>
        </ResponsiveContainer>
    );
}