import { useParams } from "react-router-dom";

import { useWso } from "@/hooks/usewso";



export default function WorkshopOrderDetail() {
    const { id } = useParams();

    const orderId = Number(id);

    const {
        data,
        isLoading,
        error,
    } = useWso(orderId);

    if (isLoading) {
        return <p>Loading order...</p>
    }

    if (error) {
        return <p>Failed to load order.</p>
    }

    if (!data) {
        return <p>Order not found.</p>
    }

    return (
        <div className="space-y-4">
            <h1>{data.wso_number}</h1>

            <p>Status: {data.status}</p>

            <p>Description: {data.description}</p>

            <p>Remarks: {data.remarks}</p>

            <p>Items: {data.line_item_count}</p>

            <p>Total: {data.total_quantity}</p>

            {data.line_items.map((item) => (
                <div key={item.id}>
                    <p>
                        {item.size} - {item.quantity}
                    </p>
                </div>
            ))}
        </div>
    )
}