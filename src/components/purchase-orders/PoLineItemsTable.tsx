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
import PoLineItemDefectsDialog from "./PoLineItemDefectsDialog";
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

                            <TableHead>Ordered</TableHead>

                            <TableHead>Delivered</TableHead>

                            <TableHead>Accepted</TableHead>

                            <TableHead>Defective</TableHead>

                            <TableHead>Outstanding</TableHead>

                            <TableHead className="text-right">Actions</TableHead>

                        </TableRow>

                    </TableHeader>

                    <TableBody>

                        {item.line_items.length === 0 ? (

                            <TableRow>
                                <TableCell
                                    colSpan={7}
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

                                    <TableCell>{line.total_delivered}</TableCell>

                                    <TableCell>{line.total_accepted}</TableCell>

                                    <TableCell>
                                        {line.total_defective > 0 ? (
                                            <span className="font-medium text-red-600">
                                                {line.total_defective}
                                            </span>
                                        ) : (
                                            0
                                        )}
                                    </TableCell>

                                    <TableCell>{line.outstanding}</TableCell>

                                    <TableCell>

                                        <div className="flex items-center justify-end gap-2">

                                            <PoLineItemDefectsDialog
                                                line={line}
                                                purchaseOrderId={purchaseOrderId}
                                            />

                                            {!isLocked && (
                                                <PoLineItemActions
                                                    item={line}
                                                    purchaseOrderId={purchaseOrderId}
                                                />
                                            )}

                                        </div>

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