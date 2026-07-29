import { useCategories } from "@/hooks/useCategories";
import type { WsoItemDetail } from "@/types/wso";

interface Props {
    item: WsoItemDetail;
}

export default function ProductHeader({ item }: Props) {
    const { data: categories } = useCategories();

    const categoryName =
        categories?.find(c => c.id === item.category_id)?.name ?? "-";

    return (
        <div className="rounded-lg border bg-white p-6 shadow-sm">

            <div className="flex items-start justify-between">

                <div>

                    <h2 className="text-2xl font-semibold">
                        {item.description}
                    </h2>

                    <p className="mt-2 text-slate-600">
                        <span className="font-semibold">
                            Category:
                        </span>{" "}
                        {categoryName}
                    </p>

                </div>

                <div
                    className="rounded-full px-4 py-2 text-sm font-semibold text-white"
                    style={{
                        backgroundColor:
                            item.current_stage_color ?? "#6b7280",
                    }}
                >
                    {item.current_stage_name ?? "Not Started"}
                </div>

            </div>

            <div className="mt-6 grid grid-cols-2 gap-6">

                <div>
                    <p className="font-semibold">Design Code:</p>
                    <p>{item.design_code ?? "-"}</p>
                </div>

                <div>
                    <p className="font-semibold">Fabric Code:</p>
                    <p>{item.fabric_code ?? "-"}</p>
                </div>

                <div>
                    <p className="font-semibold">Branding:</p>
                    <p>
                        {item.branding_required
                            ? "Required"
                            : "Not Required"}
                    </p>
                </div>

            </div>

        </div>
    );
}