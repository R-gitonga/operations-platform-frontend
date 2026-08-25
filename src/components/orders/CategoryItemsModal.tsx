import { useNavigate } from "react-router-dom";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

import StatusBadge from "@/components/dashboard/StatusBadge";

import { useCategoryItems } from "@/hooks/useCategoryItems"

interface CategoryItemsModalProps {
    open: boolean;

    onOpenChange: (open: boolean) => void;

    categoryId: number | null;

    categoryName: string | null;
}

export default function CategoryItemsModal({
    open,
    onOpenChange,
    categoryId,
    categoryName,
}: CategoryItemsModalProps) {

    const navigate = useNavigate();

    const {
        data: items = [],
        isLoading,
        error,
    } = useCategoryItems(categoryId);

    return (

        <Dialog
            open={open}
            onOpenChange={onOpenChange}
        >

            <DialogContent className="sm:max-w-4xl">

                <DialogHeader>

                    <DialogTitle>

                        {categoryName
                            ? `${categoryName} — Across All WSOs`
                            : "Products by Category"}

                    </DialogTitle>

                    <DialogDescription>

                        Every product in this category, across every workshop order.
                        Click a row to open its WSO.

                    </DialogDescription>

                </DialogHeader>

                {isLoading && (
                    <p className="py-6 text-sm text-slate-500">
                        Loading products...
                    </p>
                )}

                {!!error && (
                    <p className="py-6 text-sm text-red-600">
                        Failed to load products for this category.
                    </p>
                )}

                {!isLoading && !error && items.length === 0 && (
                    <p className="py-6 text-sm text-slate-500">
                        No products found in this category.
                    </p>
                )}

                {!isLoading && !error && items.length > 0 && (

                    <div className="max-h-[60vh] overflow-y-auto overflow-x-auto">

                        <table className="w-full text-sm">

                            <thead className="sticky top-0 border-b bg-white">

                                <tr>

                                    <th className="px-3 py-2 text-left font-medium text-slate-600">
                                        WSO
                                    </th>

                                    <th className="px-3 py-2 text-left font-medium text-slate-600">
                                        Status
                                    </th>

                                    <th className="px-3 py-2 text-left font-medium text-slate-600">
                                        Description
                                    </th>

                                    <th className="px-3 py-2 text-left font-medium text-slate-600">
                                        Production Stage
                                    </th>

                                    <th className="px-3 py-2 text-right font-medium text-slate-600">
                                        Raised
                                    </th>

                                    <th className="px-3 py-2 text-right font-medium text-slate-600">
                                        Received
                                    </th>

                                    <th className="px-3 py-2 text-right font-medium text-slate-600">
                                        Balance
                                    </th>

                                </tr>

                            </thead>

                            <tbody className="divide-y">

                                {items.map((item) => (

                                    <tr
                                        key={item.wso_item_id}
                                        onClick={() => {
                                            onOpenChange(false);
                                            navigate(`/orders/${item.wso_id}`);
                                        }}
                                        className="cursor-pointer hover:bg-slate-50"
                                    >

                                        <td className="px-3 py-3 font-medium">
                                            {item.wso_number}
                                        </td>

                                        <td className="px-3 py-3">
                                            <StatusBadge status={item.wso_status} />
                                        </td>

                                        <td className="px-3 py-3">
                                            {item.description ?? "-"}
                                        </td>

                                        <td className="px-3 py-3">

                                            {item.current_stage_name ? (

                                                <span
                                                    className="rounded-full px-3 py-1 text-xs font-medium text-white"
                                                    style={{
                                                        backgroundColor:
                                                            item.current_stage_color
                                                            ?? "#94a3b8",
                                                    }}
                                                >

                                                    {item.current_stage_name}

                                                </span>

                                            ) : (

                                                <span className="text-slate-400">
                                                    -
                                                </span>

                                            )}

                                        </td>

                                        <td className="px-3 py-3 text-right">
                                            {item.total_qty_raised}
                                        </td>

                                        <td className="px-3 py-3 text-right">
                                            {item.total_qty_received}
                                        </td>

                                        <td className="px-3 py-3 text-right">
                                            {item.total_balance}
                                        </td>

                                    </tr>

                                ))}

                            </tbody>

                        </table>

                    </div>

                )}

            </DialogContent>

        </Dialog>

    );

}