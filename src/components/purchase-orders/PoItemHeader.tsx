import { useCategories } from "@/hooks/useCategories";

import type { PoItemDetail } from "@/types/purchaseOrder";

interface Props {
    item: PoItemDetail;
}

function formatDate(value?: string | null) {

    if (!value) {
        return null;
    }

    return new Date(value).toLocaleDateString(undefined, {
        dateStyle: "medium",
    });
}

export default function PoItemHeader({ item }: Props) {

    const { data: categories } = useCategories();

    const categoryName =
        categories?.find(
            (category) => category.id === item.category_id
        )?.name ?? "-";

    const dueDate = formatDate(item.expected_delivery_date);

    return (
        <div className="w-full">

            <div className="flex items-center justify-between gap-4">

                <div className="min-w-0">

                    <h2 className="truncate text-xl font-semibold">
                        {item.description || "Unnamed Product"}
                    </h2>

                    <p className="mt-1 text-sm text-slate-600">
                        <span className="font-semibold">
                            Category:
                        </span>{" "}
                        {categoryName}
                    </p>

                </div>

                <div
                    className="
                        shrink-0
                        rounded-full
                        bg-slate-600
                        px-4
                        py-2
                        text-sm
                        font-semibold
                        text-white
                    "
                >
                    {dueDate ? `Due ${dueDate}` : "No delivery date set"}
                </div>

            </div>

        </div>
    );
}