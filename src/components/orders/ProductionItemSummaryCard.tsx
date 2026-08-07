import { useState } from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Button } from "@/components/ui/button";

import type { WsoItemDetail } from "@/types/wso";

import ChangeStageDialog from "./ChangeStageDialog";

interface Props {
  wsoId: number;
  wsoStatus: string;
  item: WsoItemDetail;
}

function SummaryRow({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex items-center justify-between border-b py-2 last:border-b-0">
      <span className="font-medium text-slate-600">{label}</span>

      <span className="font-semibold">{value}</span>
    </div>
  );
}

function DetailRow({ label, value }: { label: string; value?: string | null }) {
  return (
    <div className="border-b py-3 last:border-b-0">
      <p className="text-sm font-medium text-slate-500">{label}</p>

      <p className="mt-1">{value && value.trim().length > 0 ? value : "-"}</p>
    </div>
  );
}

function formatDate(value?: string | null) {
  if (!value) {
    return "-";
  }

  return new Date(value).toLocaleString(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

export default function ProductionItemSummaryCard({
  wsoId,
  wsoStatus,
  item,
}: Props) {
  const [dialogOpen, setDialogOpen] = useState(false);

  const normalizedStatus = wsoStatus.toLowerCase();
  const isOrderLocked = ["cancelled", "completed"].includes(normalizedStatus);
  const isItemCompleted = item.total_balance === 0;
  const isStageUpdateLocked = isOrderLocked || isItemCompleted;

  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Production</CardTitle>

          {!isStageUpdateLocked && (
            <Button onClick={() => setDialogOpen(true)}>
              Update Production
            </Button>
          )}
        </CardHeader>

        <CardContent className="space-y-6">
          <div>
            <p className="text-sm font-medium text-slate-500 mb-2">
              Current Stage
            </p>

            <span
              className="inline-flex rounded-full px-4 py-2 text-sm font-semibold text-white"
              style={{
                backgroundColor: item.current_stage_color ?? "#6b7280",
              }}
            >
              {item.current_stage_name ?? "Not Started"}
            </span>
          </div>

          <DetailRow
            label="Last Updated By"
            value={item.current_stage_changed_by}
          />

          <DetailRow
            label="Last Updated"
            value={formatDate(item.current_stage_changed_at)}
          />

          <DetailRow label="Latest Notes" value={item.current_stage_notes} />

          <div className="pt-2">
            <SummaryRow label="Line Items" value={item.line_items.length} />

            <SummaryRow label="Qty Raised" value={item.total_qty_raised} />

            <SummaryRow label="Qty Received" value={item.total_qty_received} />

            <SummaryRow label="Balance" value={item.total_balance} />
          </div>
        </CardContent>
      </Card>

      <ChangeStageDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        wsoId={wsoId}
        wsoItemId={item.id}
        currentStageId={item.current_stage_id}
      />
    </>
  );
}
