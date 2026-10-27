import { Card } from "@/components/ui/card";
import { reasonLabel } from "@/api/paidOrders";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import type { WsoItemDetail } from "@/types/wso";

import ProductHeader from "./ProductHeader";
import ProductionItemSummaryCard from "./ProductionItemSummaryCard";
import ProductionTimelineCard from "./ProductionTimeLineCard";
import LineItemsTable from "./SizeBreakdownCard";

interface Props {
  item: WsoItemDetail;
  wsoStatus: string;
  wsoId: number;
}

export default function ProductionItemSection({
  item,
  wsoStatus,
  wsoId,
}: Props) {
  return (
    <Card className="overflow-hidden">
      <Accordion type="single" collapsible>
        <AccordionItem value={`item-${item.id}`} className="border-0">
          <AccordionTrigger className="px-6 py-5 hover:no-underline">
            <div className="w-full pr-4 text-left">
              <ProductHeader item={item} />
              {item.paid_order_reason && <p className="mt-2 text-sm font-medium text-sky-700">{reasonLabel(item.paid_order_reason)}</p>}
            </div>
          </AccordionTrigger>

          <AccordionContent className="px-6 pb-6">
            <div className="space-y-8">

              {/* Production and Timeline */}
              <div className="grid gap-6 lg:grid-cols-2">
                <ProductionItemSummaryCard
                  item={item}
                  wsoId={wsoId}
                  wsoStatus={wsoStatus}
                />

                <ProductionTimelineCard
                  wsoItemId={item.id}
                />
              </div>

              {/* Size Breakdown */}
              <LineItemsTable
                item={item}
                wsoStatus={wsoStatus}
              />

            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </Card>
  );
}
