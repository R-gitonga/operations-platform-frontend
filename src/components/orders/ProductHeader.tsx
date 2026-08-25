import { useCategories } from "@/hooks/useCategories";
import type { WsoItemDetail } from "@/types/wso";

interface Props {
    item: WsoItemDetail;
}

export default function ProductHeader({ item }: Props) {
    const { data: categories } = useCategories();

    const categoryName =
        categories?.find(
            (category) => category.id === item.category_id
        )?.name ?? "-";

    return (
        <div className="w-full">

            <div className="flex items-center justify-between gap-4">

                <div className="min-w-0">

                    <h2 className="truncate text-xl font-semibold">
                        {item.description}
                    </h2>

                    <p className="mt-1 text-sm text-slate-600">
                        <span className="font-semibold">
                            Category:
                        </span>{" "}
                        {categoryName}
                    </p>

                </div>

                <div
                    className="shrink-0 rounded-full px-4 py-2 text-sm font-semibold text-white"
                    style={{
                        backgroundColor:
                            item.current_stage_color ?? "#6b7280",
                    }}
                >
                    {item.current_stage_name ?? "Not Started"}
                </div>

            </div>

        </div>
    );
}