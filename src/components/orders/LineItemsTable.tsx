import {
    Card,
    CardContent,
    CardHeader,
    CardTitle
} from "@/components/ui/card";

import { 
    Table,
    TableBody,
    TableCell,
    TableHeader,
    TableHead,
    TableRow,
 } from "@/components/ui/table";

 import type { WsoLineItem } from "@/types/lineItem";
import LineItemActions from "./LineItemActions";
import AddLineItemDialog from "./AddLineItemDialog";

 interface Props {
    wsoId: number;
    items: WsoLineItem[];
 }

export default function LineItemsTable({
    wsoId,
    items,
}: Props) {
    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>
                    Line Items
                </CardTitle>

                <AddLineItemDialog
                    wsoId={wsoId}
                />
                
            </CardHeader>

            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="text-left">Size</TableHead>
                            <TableHead className="text-left">Raised</TableHead>
                            <TableHead className="text-left">Received</TableHead>
                            <TableHead className="text-left">Balance</TableHead>
                            <TableHead className="text-left">Status</TableHead>
                            <TableHead className="text-left">Actions</TableHead>
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
                        ): (
                            items.map((item) => (
                                <TableRow key={item.id}>

                                    <TableCell className="text-left">
                                        {item.size}
                                    </TableCell>

                                    <TableCell className="text-left">
                                        {item.qty_raised}
                                    </TableCell>

                                    <TableCell className="text-left">
                                        {item.qty_received}
                                    </TableCell>

                                    <TableCell className="text-left">
                                        {item.balance}
                                    </TableCell>

                                    <TableCell className="text-left">
                                        {item.status}
                                    </TableCell>

                                    <TableCell className="text-left">
                                        <LineItemActions
                                            item={item}
                                        />
                                    </TableCell>

                                </TableRow>
                        )))}

                    </TableBody>

                </Table>

            </CardContent>

        </Card>
    );
}