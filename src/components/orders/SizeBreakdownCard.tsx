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

import {
    Badge,
} from "@/components/ui/badge";

import { useCategories } from "@/hooks/useCategories";

import type { WsoItemDetail } from "@/types/wso";

import LineItemActions from "./LineItemActions";
import AddLineItemDialog from "./AddLineItemDialog";

interface Props {
    item: WsoItemDetail;
    wsoStatus: string;
}

export default function LineItemsTable({
    item,
    wsoStatus,
}: Props) {

    const { data: categories } = useCategories();

    const categoryName =
        categories?.find(
            c => c.id === item.category_id
        )?.name ?? "-";

    const isLocked =
        ["cancelled", "completed"].includes(
            wsoStatus.toLowerCase()
        );

    return (

        <Card>

            <CardHeader className="space-y-4">

                <div className="flex items-center justify-between">

                    <CardTitle>
                        {item.description || "Unnamed Product"}
                    </CardTitle>

                    {item.current_stage_name && (

                        <Badge
                            style={{
                                backgroundColor:
                                    item.current_stage_color ?? undefined,
                            }}
                        >
                            {item.current_stage_name}
                        </Badge>

                    )}

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

                    <div>
                        <strong>Design Code:</strong>{" "}
                        {item.design_code ?? "-"}
                    </div>

                    <div>
                        <strong>Fabric Code:</strong>{" "}
                        {item.fabric_code ?? "-"}
                    </div>

                </div>

                <div className="flex items-center justify-between pt-4">

                    <h3 className="font-semibold">
                        Size Breakdown
                    </h3>

                    {!isLocked && (

                        <AddLineItemDialog
                            wsoItemId={item.id}
                        />

                    )}

                </div>

            </CardHeader>

            <CardContent>

                <Table>

                    <TableHeader>

                        <TableRow>

                            <TableHead>Size</TableHead>

                            <TableHead>Raised</TableHead>

                            <TableHead>Received</TableHead>

                            <TableHead>Balance</TableHead>

                            <TableHead>Status</TableHead>

                            <TableHead>Actions</TableHead>

                        </TableRow>

                    </TableHeader>

                    <TableBody>

                        {item.line_items.length === 0 ? (

                            <TableRow>

                                <TableCell
                                    colSpan={6}
                                    className="text-center text-muted-foreground"
                                >
                                    No sizes added.
                                </TableCell>

                            </TableRow>

                        ) : (

                            item.line_items.map((line) => (

                                <TableRow key={line.id}>

                                    <TableCell>{line.size}</TableCell>

                                    <TableCell>{line.qty_raised}</TableCell>

                                    <TableCell>{line.qty_received}</TableCell>

                                    <TableCell>{line.balance}</TableCell>

                                    <TableCell>{line.status}</TableCell>

                                    <TableCell>

                                        {!isLocked && (

                                            <LineItemActions
                                                item={line}
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