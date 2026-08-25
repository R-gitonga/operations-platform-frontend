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

import { useAllBrandingLocations } from "@/hooks/useBranding";
import { useActivateBrandingLocation } from "@/hooks/useActivateBrandingLocation";

import type { BrandingLocation } from "@/types/branding";

import BrandingLocationDialog from "@/components/settings/BrandingLocationDialog";
import DeactivateBrandingLocationDialog from "@/components/settings/DeactivateBrandingLocationDialog";

export default function BrandingLocationsPage() {

    const {

        data: brandingLocations = [],

        isLoading,

        error,

    } = useAllBrandingLocations();

    const activateBrandingLocation = useActivateBrandingLocation();

    const [
        createOpen,
        setCreateOpen,
    ] = useState(false);

    const [
        editLocation,
        setEditLocation,
    ] = useState<BrandingLocation | undefined>();

    const [
        deactivateLocation,
        setDeactivateLocation,
    ] = useState<BrandingLocation | undefined>();

    if (isLoading) {

        return <p>Loading branding locations...</p>;

    }

    if (error) {

        return <p>Failed to load branding locations.</p>;

    }

    return (

        <div className="space-y-6">

            <div className="flex items-center justify-between">

                <div>

                    <h1 className="text-3xl font-bold">

                        Branding Location Settings

                    </h1>

                    <p className="text-slate-500">

                        Configure the branding locations available when adding products to a WSO.

                    </p>

                </div>

                <Button
                    className="gap-2"
                    onClick={() => setCreateOpen(true)}
                >

                    <Plus className="h-4 w-4" />

                    New Branding Location

                </Button>

            </div>

            <Card>

                <CardHeader>

                    <CardTitle>

                        Branding Locations

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

                                {brandingLocations.map((brandingLocation) => (

                                    <tr
                                        key={brandingLocation.id}
                                        className="border-b"
                                    >

                                        <td className="px-4 py-4">

                                            {brandingLocation.display_order}

                                        </td>

                                        <td className="px-4 py-4 font-medium">

                                            {brandingLocation.display_name}

                                        </td>

                                        <td className="px-4 py-4">

                                            {brandingLocation.code}

                                        </td>

                                        <td className="px-4 py-4 text-slate-500">

                                            {brandingLocation.description ?? "-"}

                                        </td>

                                        <td className="px-4 py-4">

                                            {brandingLocation.active
                                                ? "Yes"
                                                : "No"}

                                        </td>

                                        <td className="px-4 py-4">

                                            <div className="flex justify-end gap-2">

                                                <Button
                                                    size="sm"
                                                    variant="outline"
                                                    onClick={() =>
                                                        setEditLocation(brandingLocation)
                                                    }
                                                >

                                                    <Pencil className="mr-2 h-4 w-4" />

                                                    Edit

                                                </Button>

                                                {brandingLocation.active ? (

                                                    <Button
                                                        size="sm"
                                                        variant="destructive"
                                                        onClick={() =>
                                                            setDeactivateLocation(brandingLocation)
                                                        }
                                                    >

                                                        <Trash2 className="mr-2 h-4 w-4" />

                                                        Deactivate

                                                    </Button>

                                                ) : (

                                                    <Button
                                                        size="sm"
                                                        variant="outline"
                                                        disabled={activateBrandingLocation.isPending}
                                                        onClick={() =>
                                                            activateBrandingLocation.mutate(brandingLocation.id)
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

            <BrandingLocationDialog
                open={createOpen}
                onOpenChange={setCreateOpen}
            />

            <BrandingLocationDialog
                open={!!editLocation}
                onOpenChange={(open) => {

                    if (!open) {

                        setEditLocation(undefined);

                    }

                }}
                brandingLocation={editLocation}
            />

            <DeactivateBrandingLocationDialog
                open={!!deactivateLocation}
                onOpenChange={(open) => {

                    if (!open) {

                        setDeactivateLocation(undefined);

                    }

                }}
                brandingLocation={deactivateLocation}
            />

        </div>

    );

}