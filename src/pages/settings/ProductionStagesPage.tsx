import { useState } from "react";

import { Button } from "@/components/ui/button";

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import {
    Plus,
    Pencil,
    Trash2,
} from "lucide-react";

import { useProductionStages } from "@/hooks/useProductionStages";

import type { ProductionStage } from "@/types/productionStage";

import ProductionStageDialog from "@/components/settings/ProductionStageDialog";
import DeactivateProductionStageDialog from "@/components/settings/DeactivateProductionStageDialog";

export default function ProductionStagesPage() {

    const {

        data: stages = [],

        isLoading,

        error,

    } = useProductionStages();

    const [

        createOpen,

        setCreateOpen,

    ] = useState(false);

    const [

        editStage,

        setEditStage,

    ] = useState<ProductionStage | undefined>();

    const [

        deactivateStage,

        setDeactivateStage,

    ] = useState<ProductionStage | undefined>();

    if (isLoading) {

        return <p>Loading production stages...</p>;

    }

    if (error) {

        return <p>Failed to load production stages.</p>;

    }

    return (

        <div className="space-y-6">

            <div className="flex items-center justify-between">

                <div>

                    <h1 className="text-3xl font-bold">

                        Production Stage Settings

                    </h1>

                    <p className="text-slate-500">

                        Configure production workflow, colours, SLA durations and attention rules.

                    </p>

                </div>

                <Button
                    className="gap-2"
                    onClick={() => setCreateOpen(true)}
                >

                    <Plus className="h-4 w-4" />

                    New Stage

                </Button>

            </div>

            <Card>

                <CardHeader>

                    <CardTitle>

                        Production Workflow

                    </CardTitle>

                </CardHeader>

                <CardContent>

                    <div className="overflow-x-auto">

                        <table className="min-w-full text-sm">

                            <thead>

                                <tr className="border-b">

                                    <th className="px-4 py-3 text-left">
                                        Order
                                    </th>

                                    <th className="px-4 py-3 text-left">
                                        Stage
                                    </th>

                                    <th className="px-4 py-3 text-left">
                                        Code
                                    </th>

                                    <th className="px-4 py-3 text-left">
                                        Duration
                                    </th>

                                    <th className="px-4 py-3 text-left">
                                        Attention
                                    </th>

                                    <th className="px-4 py-3 text-left">
                                        Active
                                    </th>

                                    <th className="px-4 py-3 text-right">
                                        Actions
                                    </th>

                                </tr>

                            </thead>

                            <tbody>

                                {stages.map((stage) => (

                                    <tr
                                        key={stage.id}
                                        className="border-b"
                                    >

                                        <td className="px-4 py-4">

                                            {stage.display_order}

                                        </td>

                                        <td className="px-4 py-4 font-medium">

                                            {stage.display_name}

                                        </td>

                                        <td className="px-4 py-4">

                                            {stage.code}

                                        </td>

                                        <td className="px-4 py-4">

                                            {stage.expected_duration_hours != null
                                                ? `${stage.expected_duration_hours} hrs`
                                                : "-"}

                                        </td>

                                        <td className="px-4 py-4">

                                            {stage.attention_enabled
                                                ? "Enabled"
                                                : "Disabled"}

                                        </td>

                                        <td className="px-4 py-4">

                                            {stage.active
                                                ? "Yes"
                                                : "No"}

                                        </td>

                                        <td className="px-4 py-4">

                                            <div className="flex justify-end gap-2">

                                                <Button
                                                    size="sm"
                                                    variant="outline"
                                                    onClick={() =>
                                                        setEditStage(stage)
                                                    }
                                                >

                                                    <Pencil className="mr-2 h-4 w-4" />

                                                    Edit

                                                </Button>

                                                <Button
                                                    size="sm"
                                                    variant="destructive"
                                                    disabled={!stage.active}
                                                    onClick={() =>
                                                        setDeactivateStage(stage)
                                                    }
                                                >

                                                    <Trash2 className="mr-2 h-4 w-4" />

                                                    Deactivate

                                                </Button>

                                            </div>

                                        </td>

                                    </tr>

                                ))}

                            </tbody>

                        </table>

                    </div>

                </CardContent>

            </Card>

            <ProductionStageDialog
                open={createOpen}
                onOpenChange={setCreateOpen}
            />

            <ProductionStageDialog
                open={!!editStage}
                onOpenChange={(open) => {

                    if (!open) {

                        setEditStage(undefined);

                    }

                }}
                stage={editStage}
            />

            <DeactivateProductionStageDialog
                open={!!deactivateStage}
                onOpenChange={(open) => {

                    if (!open) {

                        setDeactivateStage(undefined);

                    }

                }}
                stage={deactivateStage}
            />

        </div>

    );

}