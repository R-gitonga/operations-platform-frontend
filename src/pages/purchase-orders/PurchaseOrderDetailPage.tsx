import { useParams } from "react-router-dom";

import { usePurchaseOrder } from "@/hooks/usePurchaseOrders";
import PurchaseOrderInformationCard from "@/components/purchase-orders/PurchaseOrderInformationCard";
import PoItemSection from "@/components/purchase-orders/PoItemSection";

export default function PurchaseOrderDetailPage() {
    const { id } = useParams();
    const orderId = Number(id);
    const { data: order, isLoading, error } = usePurchaseOrder(orderId);

    if (!Number.isInteger(orderId) || orderId <= 0) {
        return <p>Invalid purchase order.</p>;
    }

    if (isLoading) {
        return <p>Loading purchase order...</p>;
    }

    if (error) {
        return <p>Failed to load purchase order.</p>;
    }

    if (!order) {
        return <p>Purchase order not found.</p>;
    }

    return (
        <div className="space-y-8">
            <PurchaseOrderInformationCard order={order} />

            {order.items.map((item) => (
                <PoItemSection
                    key={item.id}
                    item={item}
                    purchaseOrderId={order.id}
                    purchaseOrderStatus={order.status}
                />
            ))}
        </div>
    );
}
