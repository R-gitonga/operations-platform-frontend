import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Button } from "@/components/ui/button";

import { MoreHorizontal, Pencil } from "lucide-react";

import type { PoLineItem } from "@/types/purchaseOrder";

import EditPoLineItemDialog from "./EditPoLineItemDialog";

interface Props {
    item: PoLineItem;
    purchaseOrderId: number;
}

export default function PoLineItemActions({
    item,
    purchaseOrderId,
}: Props) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button size="icon" variant="ghost">
                    <MoreHorizontal className="h-4 w-4" />
                </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end">
                <EditPoLineItemDialog
                    item={item}
                    purchaseOrderId={purchaseOrderId}
                    trigger={
                        <DropdownMenuItem
                            onSelect={(e) => e.preventDefault()}
                        >
                            <Pencil className="mr-2 h-4 w-4" />
                            Edit
                        </DropdownMenuItem>
                    }
                />
            </DropdownMenuContent>
        </DropdownMenu>
    );
}