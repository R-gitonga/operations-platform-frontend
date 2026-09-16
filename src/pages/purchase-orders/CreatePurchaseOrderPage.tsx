import CreatePurchaseOrderForm from "@/components/purchase-orders/CreatePurchaseOrderForm";

export default function CreatePurchaseOrderPage() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold">Create Purchase Order</h1>
                <p className="text-slate-600">
                    Create a purchase order and add the items and quantities to order.
                </p>
            </div>

            <CreatePurchaseOrderForm />
        </div>
    );
}
