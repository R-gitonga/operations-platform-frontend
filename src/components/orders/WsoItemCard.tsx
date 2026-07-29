import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import type { WsoItemDetail } from "@/types/wso";

import LineItemsTable from "./SizeBreakdownCard";

interface Props {
  item: WsoItemDetail;
  wsoStatus: string;
}

function DetailRow({
  label,
  value,
}: {
  label: string;
  value: React.ReactNode;
}) {
  return (
    <div className="grid grid-cols-[180px_1fr] gap-4 py-2 border-b last:border-b-0">
      <span className="font-medium text-slate-600">{label}</span>

      <span>{value || "-"}</span>
    </div>
  );
}

export default function WsoItemCard({ item, wsoStatus }: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{item.description ?? "Unnamed Item"}</CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        <div>
          <DetailRow label="Design Code" value={item.design_code} />

          <DetailRow label="Fabric Code" value={item.fabric_code} />

          <DetailRow label="Current Stage" value={item.current_stage_name} />

          <DetailRow label="Qty Raised" value={item.total_qty_raised} />

          <DetailRow label="Qty Received" value={item.total_qty_received} />

          <DetailRow label="Balance" value={item.total_balance} />
        </div>

        <LineItemsTable item={item} wsoStatus={wsoStatus} />
      </CardContent>
    </Card>
  );
}
