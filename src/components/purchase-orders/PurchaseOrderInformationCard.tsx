import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import StatusBadge from "@/components/dashboard/StatusBadge";

import type { PurchaseOrderDetail } from "@/types/purchaseOrder";

import EditPurchaseOrderDialog from "./EditPurchaseOrderDialog";
import CancelPurchaseOrderDialog from "./CancelPurchaseOrderDialog";
import ReactivatePurchaseOrderDialog from "./ReactivatePurchaseOrderDialog";
import UploadPurchaseOrderAttachment from "./UploadPurchaseOrderAttachment";

interface Props {
    order: PurchaseOrderDetail;
}

function DetailRow({ label, value }: { label: string; value: React.ReactNode }) {
    return (
        <div className="grid grid-cols-[180px_1fr] gap-4 border-b py-2 last:border-b-0">
            <span className="font-medium text-slate-600">{label}</span>
            <span>{value || "-"}</span>
        </div>
    );
}

export default function PurchaseOrderInformationCard({ order }: Props) {
    const isCancelled = order.status.toLowerCase() === "cancelled";

    return (
        <Card>
            <CardHeader>
                <CardTitle>
                    <div className="flex items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                            <h2 className="text-xl font-semibold">Purchase Order</h2>
                            <StatusBadge status={order.status} />
                        </div>

                        <div className="flex gap-2">
                            {!isCancelled && (
                                <>
                                    <UploadPurchaseOrderAttachment
                                        purchaseOrderId={order.id}
                                    />
                                    <EditPurchaseOrderDialog order={order} />
                                    <CancelPurchaseOrderDialog
                                        id={order.id}
                                        trigger={<Button variant="destructive">Cancel</Button>}
                                    />
                                </>
                            )}

                            {isCancelled && (
                                <ReactivatePurchaseOrderDialog
                                    id={order.id}
                                    trigger={<Button>Reactivate</Button>}
                                />
                            )}
                        </div>
                    </div>
                </CardTitle>
            </CardHeader>

            <CardContent>
                <DetailRow label="ERP Reference" value={order.erp_reference} />
                <DetailRow label="Accounts Reference" value={order.accounts_reference} />
                <DetailRow label="Supplier" value={order.supplier_name} />
                <DetailRow label="Description" value={order.description} />
                <DetailRow label="Items" value={order.total_items} />
                <DetailRow label="Quantity Ordered" value={order.total_qty_ordered} />
                <DetailRow label="Created By" value={order.created_by} />
                <DetailRow
                    label="Created On"
                    value={new Date(order.created_at).toLocaleString()}
                />
                <DetailRow
                    label="Attachment"
                    value={
                        order.attachment_name ? (
                            <a
                                href={`http://localhost:3000/${order.attachment_path}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 hover:underline"
                            >
                                {order.attachment_name}
                            </a>
                        ) : null
                    }
                />
            </CardContent>
        </Card>
    );
}
