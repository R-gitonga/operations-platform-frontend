import { useParams } from "react-router-dom";

import { useWso } from "@/hooks/usewso";

import OrderInformationCard from "@/components/orders/OrderInformationCard";
import ProductionItemSection from "@/components/orders/ProductionItemSection";

export default function WorkshopOrderDetail() {
  const { id } = useParams();

  const orderId = Number(id);

  const { data: order, isLoading, error } = useWso(orderId);

  if (isLoading) {
    return <p>Loading order...</p>;
  }

  if (error) {
    return <p>Failed to load order.</p>;
  }

  if (!order) {
    return <p>Order not found.</p>;
  }

  return (
    <div className="space-y-8">
      <OrderInformationCard order={order} />

      {order.items.map((item) => (
        <ProductionItemSection
          key={item.id}
          item={item}
          wsoStatus={order.status}
          wsoId={order.id}
        />
      ))}
    </div>
  );
}
