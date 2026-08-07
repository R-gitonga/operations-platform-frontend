import { useNavigate, useParams } from "react-router-dom";

import {
    ArrowLeft,
    Package,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import { useProductionStageItems } from "@/hooks/useProductionStageItems";

import { formatTimeInStage } from "@/lib/time";

export default function ProductionStagePage() {

    const navigate = useNavigate();

    const { stageId } = useParams();

    const {
        data: items = [],
        isLoading,
        error,
    } = useProductionStageItems(
        Number(stageId),
    );

    if (isLoading) {
        return <p>Loading production stage...</p>;
    }

    if (error) {
        return <p>Failed to load production stage.</p>;
    }

    const stageName =
        items.length > 0
            ? items[0].stage_name
            : "Production Stage";

    return (

        <div className="space-y-8">

            <Button
                variant="ghost"
                className="gap-2"
                onClick={() => navigate("/")}
            >
                <ArrowLeft className="h-4 w-4" />

                Back to Dashboard
            </Button>

            <div>

                <h1 className="text-3xl font-bold">

                    {stageName}

                </h1>

                <p className="text-slate-500">

                    {items.length} product
                    {items.length === 1 ? "" : "s"}
                    {" "}currently in this production stage.

                </p>

            </div>

            <Card>

                <CardHeader>

                    <CardTitle className="flex items-center gap-2">

                        <Package className="h-5 w-5" />

                        Production Queue

                    </CardTitle>

                </CardHeader>

                <CardContent>

                    {items.length === 0 ? (

                        <div className="py-16 text-center text-slate-500">

                            No products are currently in this stage.

                        </div>

                    ) : (

                        <div className="overflow-x-auto">

                            <table className="min-w-full text-sm">

                                <thead>

                                    <tr className="border-b">

                                        <th className="px-4 py-3 text-left">
                                            WSO
                                        </th>

                                        <th className="px-4 py-3 text-left">
                                            Product
                                        </th>

                                        <th className="px-4 py-3 text-left">
                                            In Stage
                                        </th>

                                        <th className="px-4 py-3 text-left">
                                            By
                                        </th>

                                        <th className="px-4 py-3 text-left">
                                            Design
                                        </th>

                                        <th className="px-4 py-3 text-left">
                                            Fabric
                                        </th>

                                    </tr>

                                </thead>

                                <tbody>

                                    {items.map((item) => (

                                        <tr
                                            key={item.wso_item_id}
                                            className="cursor-pointer border-b hover:bg-slate-50"
                                            onClick={() =>
                                                navigate(
                                                    `/orders/${item.wso_id}`
                                                )
                                            }
                                        >

                                            <td className="px-4 py-4 font-medium">

                                                {item.wso_number}

                                            </td>

                                            <td className="px-4 py-4">

                                                <div className="font-medium">

                                                    {item.description}

                                                </div>

                                            </td>

                                            <td className="px-4 py-4">

                                                {formatTimeInStage(item.current_stage_changed_at)}
                                                
                                            </td>

                                            <td className="px-4 py-4">

                                                 {item.current_stage_changed_by}

                                            </td>

                                            <td className="px-4 py-4">

                                                {item.design_code}

                                            </td>

                                            <td className="px-4 py-4">

                                                {item.fabric_code}

                                            </td>

                                        </tr>

                                    ))}

                                </tbody>

                            </table>

                        </div>

                    )}

                </CardContent>

            </Card>

        </div>

    );

}