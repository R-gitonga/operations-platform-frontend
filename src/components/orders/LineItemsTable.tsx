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

import type { WsoLineItem } from "@/types/lineItem";

import LineItemActions from "./LineItemActions";
import AddLineItemDialog from "./AddLineItemDialog";

interface Props {
    wsoId: number;
    wsoStatus: string;
    items: WsoLineItem[];
}

export default function LineItemsTable({
    wsoId,
    wsoStatus,
    items,
}: Props) {

    const isLocked =
        ["cancelled", "completed"].includes(
            wsoStatus.toLowerCase()
        );

    return (
        <Card>

            <CardHeader className="flex flex-row items-center justify-between">

                <CardTitle>
                    Line Items
                </CardTitle>

                {!isLocked && (
                    <AddLineItemDialog
                        wsoId={wsoId}
                    />
                )}

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

                        {items.length === 0 ? (

                            <TableRow>

                                <TableCell
                                    colSpan={6}
                                    className="text-center text-muted-foreground"
                                >
                                    No line items found.
                                </TableCell>

                            </TableRow>

                        ) : (

                            items.map((item) => (

                                <TableRow key={item.id}>

                                    <TableCell>{item.size}</TableCell>

                                    <TableCell>{item.qty_raised}</TableCell>

                                    <TableCell>{item.qty_received}</TableCell>

                                    <TableCell>{item.balance}</TableCell>

                                    <TableCell>{item.status}</TableCell>

                                    <TableCell>

                                        {!isLocked && (
                                            <LineItemActions
                                                item={item}
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