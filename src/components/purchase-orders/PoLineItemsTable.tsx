import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

import { useCategories } from "@/hooks/useCategories";

import type { PoItemDetail } from "@/types/purchaseOrder";

import PoLineItemActions from "./PoLineItemActions";
import AddPoLineItemDialog from "./AddPoLineItemDialog";

interface Props {
    item: PoItemDetail;
    purchaseOrderId: number;
    purchaseOrderStatus: string;
}

export default function PoLineItemsTable({
    item,
    purchaseOrderId,
    purchaseOrderStatus,
}: Props) {

    const { data: categories } = useCategories();

    const categoryName =
        categories?.find(
            (c) => c.id === item.category_id
        )?.name ?? "-";

    const isLocked =
        purchaseOrderStatus.toLowerCase() === "cancelled";

    return (

        <Card>

            <CardHeader className="space-y-4">

                <div className="flex items-center justify-between">

                    <CardTitle>
                        {item.description || "Unnamed Product"}
                    </CardTitle>

                </div>

                <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground">

                    <div>
                        <strong>Category:</strong>{" "}
                        {categoryName}
                    </div>

                    <div>
                        <strong>Branding:</strong>{" "}
                        {item.branding_required
                            ? "Required"
                            : "Not Required"}
                    </div>

                </div>

                <div className="flex items-center justify-between pt-4">

                    <h3 className="font-semibold">
                        Size Breakdown
                    </h3>

                    {!isLocked && (
                        <AddPoLineItemDialog
                            poItemId={item.id}
                            purchaseOrderId={purchaseOrderId}
                        />
                    )}

                </div>

            </CardHeader>

            <CardContent>

                <Table>

                    <TableHeader>

                        <TableRow>

                            <TableHead>Size</TableHead>

                            {/*
                                Received / Outstanding columns will
                                be added once po_receipts exist —
                                deliberately not shown as
                                placeholder zeros until then.
                            */}
                            <TableHead>Ordered</TableHead>

                            <TableHead>Actions</TableHead>

                        </TableRow>

                    </TableHeader>

                    <TableBody>

                        {item.line_items.length === 0 ? (

                            <TableRow>
                                <TableCell
                                    colSpan={3}
                                    className="text-center text-muted-foreground"
                                >
                                    No sizes added.
                                </TableCell>
                            </TableRow>

                        ) : (

                            item.line_items.map((line) => (

                                <TableRow key={line.id}>

                                    <TableCell>{line.size}</TableCell>

                                    <TableCell>{line.qty_ordered}</TableCell>

                                    <TableCell>

                                        {!isLocked && (
                                            <PoLineItemActions
                                                item={line}
                                                purchaseOrderId={purchaseOrderId}
                                            />
                                        )}

                                    </TableCell>

                                </TableRow>

                            ))

                        )}

                    </TableBody>

                </Table>

            </CardContent>

        </Card>

    );
}