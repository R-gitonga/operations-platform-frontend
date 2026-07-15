import { useParams } from "react-router-dom";
import { useWso } from "@/hooks/usewso";
import OrderInformationCard from "@/components/orders/OrderInformationCard";
import ProductionSummaryCard from "@/components/orders/ProductionSummaryCard";
import LineItemsTable from "@/components/orders/LineItemsTable";
import { useCategories } from "@/hooks/useCategories";



export default function WorkshopOrderDetail() {
    const { id } = useParams();
    
    const orderId = Number(id);

    const {
        data,
        isLoading,
        error,
    } = useWso(orderId);

    const { data: categories } = useCategories();

    if (isLoading) {
        return <p>Loading order...</p>
    }

    if (error) {
        return <p>Failed to load order.</p>
    }

    if(!data) {
        return <p>Order not found.</p>
    }

    const categoryName = categories?.find(
        (c) => c.id === data?.category_id
    )?.name;

    return (
        <div className="space-y-6">

            <OrderInformationCard
                order={data}
                categoryName={categoryName}
            />

            <ProductionSummaryCard
                order={data}
            />

            <LineItemsTable
                wsoId={data.id}
                items={data.line_items}
            />

        </div>
        
    );
}