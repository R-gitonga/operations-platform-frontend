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
    RotateCcw,
} from "lucide-react";

import { useAllBrandingTypes } from "@/hooks/useBranding";
import { useActivateBrandingType } from "@/hooks/useActivateBrandingType";

import type { BrandingType } from "@/types/branding";

import BrandingTypeDialog from "@/components/settings/BrandingTypeDialog";
import DeactivateBrandingTypeDialog from "@/components/settings/DeactivateBrandingTypeDialog";

export default function BrandingTypesPage() {

    const {

        data: brandingTypes = [],

        isLoading,

        error,

    } = useAllBrandingTypes();

    const activateBrandingType = useActivateBrandingType();

    const [
        createOpen,
        setCreateOpen,
    ] = useState(false);

    const [
        editType,
        setEditType,
    ] = useState<BrandingType | undefined>();

    const [
        deactivateType,
        setDeactivateType,
    ] = useState<BrandingType | undefined>();

    if (isLoading) {

        return <p>Loading branding types...</p>;

    }

    if (error) {

        return <p>Failed to load branding types.</p>;

    }

    return (

        <div className="space-y-6">

            <div className="flex items-center justify-between">

                <div>

                    <h1 className="text-3xl font-bold">

                        Branding Type Settings

                    </h1>

                    <p className="text-slate-500">

                        Configure the branding types available when adding products to a WSO.

                    </p>

                </div>

                <Button
                    className="gap-2"
                    onClick={() => setCreateOpen(true)}
                >

                    <Plus className="h-4 w-4" />

                    New Branding Type

                </Button>

            </div>

            <Card>

                <CardHeader>

                    <CardTitle>

                        Branding Types

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
                                        Name
                                    </th>

                                    <th className="px-4 py-3 text-left">
                                        Code
                                    </th>

                                    <th className="px-4 py-3 text-left">
                                        Description
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

                                {brandingTypes.map((brandingType) => (

                                    <tr
                                        key={brandingType.id}
                                        className="border-b"
                                    >

                                        <td className="px-4 py-4">

                                            {brandingType.display_order}

                                        </td>

                                        <td className="px-4 py-4 font-medium">

                                            {brandingType.display_name}

                                        </td>

                                        <td className="px-4 py-4">

                                            {brandingType.code}

                                        </td>

                                        <td className="px-4 py-4 text-slate-500">

                                            {brandingType.description ?? "-"}

                                        </td>

                                        <td className="px-4 py-4">

                                            {brandingType.active
                                                ? "Yes"
                                                : "No"}

                                        </td>

                                        <td className="px-4 py-4">

                                            <div className="flex justify-end gap-2">

                                                <Button
                                                    size="sm"
                                                    variant="outline"
                                                    onClick={() =>
                                                        setEditType(brandingType)
                                                    }
                                                >

                                                    <Pencil className="mr-2 h-4 w-4" />

                                                    Edit

                                                </Button>

                                                {brandingType.active ? (

                                                    <Button
                                                        size="sm"
                                                        variant="destructive"
                                                        onClick={() =>
                                                            setDeactivateType(brandingType)
                                                        }
                                                    >

                                                        <Trash2 className="mr-2 h-4 w-4" />

                                                        Deactivate

                                                    </Button>

                                                ) : (

                                                    <Button
                                                        size="sm"
                                                        variant="outline"
                                                        disabled={activateBrandingType.isPending}
                                                        onClick={() =>
                                                            activateBrandingType.mutate(brandingType.id)
                                                        }
                                                    >

                                                        <RotateCcw className="mr-2 h-4 w-4" />

                                                        Activate

                                                    </Button>

                                                )}

                                            </div>

                                        </td>

                                    </tr>

                                ))}

                            </tbody>

                        </table>

                    </div>

                </CardContent>

            </Card>

            <BrandingTypeDialog
                open={createOpen}
                onOpenChange={setCreateOpen}
            />

            <BrandingTypeDialog
                open={!!editType}
                onOpenChange={(open) => {

                    if (!open) {

                        setEditType(undefined);

                    }

                }}
                brandingType={editType}
            />

            <DeactivateBrandingTypeDialog
                open={!!deactivateType}
                onOpenChange={(open) => {

                    if (!open) {

                        setDeactivateType(undefined);

                    }

                }}
                brandingType={deactivateType}
            />

        </div>

    );

}