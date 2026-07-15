import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Button } from "@/components/ui/button";

import {
    MoreHorizontal,
    Pencil,
    PackageCheck,
    Trash2
} from "lucide-react";

import type { WsoLineItem } from "@/types/lineItem";

import EditLineItemDialog from "./EditLineItemDialog";
import ReceiveLineItemDialog from "./ReceiveLineItemDialog";
import DeleteLineItemDialog from "./DeleteLineItemDialog";

interface Props {
    item: WsoLineItem
}

export default function LineItemActions({
    item,
}: Props) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    size="icon"
                    variant="ghost"
                >
                    <MoreHorizontal className="h-4 w-4" />
                </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end">
                <EditLineItemDialog
                    item={item}
                    trigger={
                        <DropdownMenuItem
                            onSelect={(e) => e.preventDefault()}
                        >
                            <Pencil className="mr-2 h-4 w-4" />
                            Edit
                        </DropdownMenuItem>
                    }
                />

                <ReceiveLineItemDialog
                    item={item}
                    trigger={
                        <DropdownMenuItem
                            onSelect={(e) => e.preventDefault()}
                        >
                            <PackageCheck className="mr-2 h-4 w-4" />
                                Receive Stock
                        </DropdownMenuItem>
                    }
                />
                

                <DeleteLineItemDialog
                    item={item}
                    trigger={
                        <DropdownMenuItem 
                            className="text-red-600" 
                            onSelect={(e) => e.preventDefault()}
                        >
                            <Trash2 className="mr-2 h-4 w-4" />
                                Delete
                        </DropdownMenuItem>
                    }
                />

            </DropdownMenuContent>

        </DropdownMenu>
    );
}