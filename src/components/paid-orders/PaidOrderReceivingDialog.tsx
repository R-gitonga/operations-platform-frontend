import { useState } from "react";
import { Link } from "react-router-dom";
import { type PaidOrderRow, reasonLabel } from "@/api/paidOrders";
import { useWso } from "@/hooks/useWso";
import { usePurchaseOrder } from "@/hooks/usePurchaseOrders";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from "@/components/ui/dialog";
import ReceiveLineItemDialog from "@/components/orders/ReceiveLineItemDialog";
import ReceiveDeliveryDialog from "@/components/purchase-orders/ReceiveDeliveryDialog";
import { getApiErrorMessage } from "@/lib/apiError";

function WsoReceiving({ id }: { id: number }) {
  const query = useWso(id);
  if (query.isPending) return <p>Loading workshop order…</p>;
  if (query.isError) return <p role="alert">{getApiErrorMessage(query.error)} <Button onClick={() => query.refetch()}>Retry</Button></p>;
  const order = query.data;
  const locked = ["cancelled", "completed"].includes(order.status.toLowerCase());
  return <div className="space-y-4">
    {locked && <p>This order is {order.status}. Receiving is closed.</p>}
    {order.items.map(item => <section key={item.id} className="rounded-lg border p-4">
      <h3 className="font-semibold">{item.description || `Item ${item.id}`}</h3>
      {item.paid_order_reason && <p className="text-sm text-slate-600">{reasonLabel(item.paid_order_reason)}</p>}
      {item.line_items.length === 0 && <p>No sizes have been added yet.</p>}
      {item.line_items.map(line => <div key={line.id} className="flex flex-wrap items-center justify-between gap-3 border-t py-3 mt-2">
        <div><p className="font-medium">{line.size}</p><p className="text-sm text-slate-600">Ordered {line.qty_raised} · Received {line.qty_received} · Remaining {line.balance}</p></div>
        <ReceiveLineItemDialog item={line} trigger={<Button disabled={locked || line.balance <= 0}>Receive stock</Button>} />
      </div>)}
    </section>)}
  </div>;
}

function PoReceiving({ id }: { id: number }) {
  const query = usePurchaseOrder(id);
  if (query.isPending) return <p>Loading purchase order…</p>;
  if (query.isError) return <p role="alert">{getApiErrorMessage(query.error)} <Button onClick={() => query.refetch()}>Retry</Button></p>;
  const order = query.data;
  const canReceive = order.status.toLowerCase() !== "cancelled" && order.items.some(i => i.line_items.some(l => l.total_delivered < l.qty_ordered));
  return <div className="space-y-4">
    {order.items.map(item => <section key={item.id} className="rounded-lg border p-4">
      <h3 className="font-semibold">{item.description || `Item ${item.id}`}</h3>
      {item.paid_order_reason && <p className="text-sm text-slate-600">{reasonLabel(item.paid_order_reason)}</p>}
      {item.line_items.map(line => <p key={line.id} className="mt-2 text-sm">{line.size} · Ordered {line.qty_ordered} · Delivered {line.total_delivered} · Remaining to deliver {Math.max(0, line.qty_ordered - line.total_delivered)}</p>)}
    </section>)}
    {canReceive ? <ReceiveDeliveryDialog order={order} /> : <p>No further supplier deliveries can be recorded. Use order details to review receipts or defects.</p>}
  </div>;
}

export default function PaidOrderReceivingDialog({ order }: { order: PaidOrderRow }) {
  const [open, setOpen] = useState(false);
  const path = order.order_type === "wso" ? `/orders/${order.order_id}` : `/purchase-orders/${order.order_id}`;
  return <Dialog open={open} onOpenChange={setOpen}>
    <DialogTrigger asChild><Button className="relative z-10" variant="outline">Receiving</Button></DialogTrigger>
    <DialogContent className="sm:max-w-3xl max-h-[90vh] overflow-y-auto">
      <DialogHeader><DialogTitle>Receiving · {order.order_type.toUpperCase()} {order.reference}</DialogTitle>
        <DialogDescription>{order.branch_name} · All items in this order are shown, regardless of the page filters. Record the existing workshop or supplier receipt here.</DialogDescription>
      </DialogHeader>
      {open && (order.order_type === "wso" ? <WsoReceiving id={order.order_id} /> : <PoReceiving id={order.order_id} />)}
      <Button asChild variant="outline"><Link to={path}>View order details and history</Link></Button>
    </DialogContent>
  </Dialog>;
}
