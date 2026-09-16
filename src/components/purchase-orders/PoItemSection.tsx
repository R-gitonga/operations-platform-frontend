import { Card } from "@/components/ui/card";

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

import type { PoItemDetail } from "@/types/purchaseOrder";

import PoItemHeader from "./PoItemHeader";
import PoItemSummaryCard from "./PoItemSummaryCard";
import ProcurementTimelineCard from "./ProcurementTimelineCard";
import PoLineItemsTable from "./PoLineItemsTable";

interface Props {
    item: PoItemDetail;
    purchaseOrderStatus: string;
    purchaseOrderId: number;
}

export default function PoItemSection({
    item,
    purchaseOrderStatus,
    purchaseOrderId,
}: Props) {
    return (
        <Card className="overflow-hidden">
            <Accordion type="single" collapsible>
                <AccordionItem value={`item-${item.id}`} className="border-0">
                    <AccordionTrigger className="px-6 py-5 hover:no-underline">
                        <div className="w-full pr-4 text-left">
                            <PoItemHeader item={item} />
                        </div>
                    </AccordionTrigger>

                    <AccordionContent className="px-6 pb-6">
                        <div className="space-y-8">

                            {/* Item Details and Procurement Timeline */}
                            <div className="grid gap-6 lg:grid-cols-2">
                                <PoItemSummaryCard
                                    purchaseOrderId={purchaseOrderId}
                                    purchaseOrderStatus={purchaseOrderStatus}
                                    item={item}
                                />

                                <ProcurementTimelineCard
                                    poItemId={item.id}
                                    purchaseOrderId={purchaseOrderId}
                                />
                            </div>

                            {/* Size Breakdown */}
                            <PoLineItemsTable
                                item={item}
                                purchaseOrderId={purchaseOrderId}
                                purchaseOrderStatus={purchaseOrderStatus}
                            />

                        </div>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </Card>
    );
}