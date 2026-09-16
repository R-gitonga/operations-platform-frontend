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

import { useAllSuppliers } from "@/hooks/useSuppliers";
import {useActivateSupplier} from "@/hooks/useActivateSupplier"

import type { Supplier } from "@/types/supplier";

import SupplierDialog from "@/components/settings/SupplierDialog";
import DeactivateSupplierDialog from "@/components/settings/DeactivateSupplierDialog";

export default function SuppliersPage() {

    const {

        data: suppliers = [],

        isLoading,

        error,

    } = useAllSuppliers();

    const activateSupplier = useActivateSupplier();

    const [
        createOpen,
        setCreateOpen,
    ] = useState(false);

    const [
        editSupplier,
        setEditSupplier,
    ] = useState<Supplier | undefined>();

    const [
        deactivateSupplier,
        setDeactivateSupplier,
    ] = useState<Supplier | undefined>();

    if (isLoading) {

        return <p>Loading suppliers...</p>;

    }

    if (error) {

        return <p>Failed to load suppliers.</p>;

    }

    return (

        <div className="space-y-6">

            <div className="flex items-center justify-between">

                <div>

                    <h1 className="text-3xl font-bold">

                        Supplier Settings

                    </h1>

                    <p className="text-slate-500">

                        Configure the suppliers available when creating a Purchase Order.

                    </p>

                </div>

                <Button
                    className="gap-2"
                    onClick={() => setCreateOpen(true)}
                >

                    <Plus className="h-4 w-4" />

                    New Supplier

                </Button>

            </div>

            <Card>

                <CardHeader>

                    <CardTitle>

                        Suppliers

                    </CardTitle>

                </CardHeader>

                <CardContent>

                    <div className="overflow-x-auto">

                        <table className="min-w-full text-sm">

                            <thead>

                                <tr className="border-b">

                                    <th className="px-4 py-3 text-left">
                                        Name
                                    </th>

                                    <th className="px-4 py-3 text-left">
                                        Point of Contact
                                    </th>

                                    <th className="px-4 py-3 text-left">
                                        Contact Info
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

                                {suppliers.map((supplier) => (

                                    <tr
                                        key={supplier.id}
                                        className="border-b"
                                    >

                                        <td className="px-4 py-4 font-medium">

                                            {supplier.name}

                                        </td>

                                        <td className="px-4 py-4">

                                            {supplier.contact_name ?? "-"}

                                        </td>

                                        <td className="px-4 py-4 text-slate-500">

                                            {supplier.contact_info ?? "-"}

                                        </td>

                                        <td className="px-4 py-4">

                                            {supplier.active
                                                ? "Yes"
                                                : "No"}

                                        </td>

                                        <td className="px-4 py-4">

                                            <div className="flex justify-end gap-2">

                                                <Button
                                                    size="sm"
                                                    variant="outline"
                                                    onClick={() =>
                                                        setEditSupplier(supplier)
                                                    }
                                                >

                                                    <Pencil className="mr-2 h-4 w-4" />

                                                    Edit

                                                </Button>

                                                {supplier.active ? (

                                                    <Button
                                                        size="sm"
                                                        variant="destructive"
                                                        onClick={() =>
                                                            setDeactivateSupplier(supplier)
                                                        }
                                                    >

                                                        <Trash2 className="mr-2 h-4 w-4" />

                                                        Deactivate

                                                    </Button>

                                                ) : (

                                                    <Button
                                                        size="sm"
                                                        variant="outline"
                                                        disabled={activateSupplier.isPending}
                                                        onClick={() =>
                                                            activateSupplier.mutate(supplier.id)
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

            <SupplierDialog
                open={createOpen}
                onOpenChange={setCreateOpen}
            />

            <SupplierDialog
                open={!!editSupplier}
                onOpenChange={(open) => {

                    if (!open) {

                        setEditSupplier(undefined);

                    }

                }}
                supplier={editSupplier}
            />

            <DeactivateSupplierDialog
                open={!!deactivateSupplier}
                onOpenChange={(open) => {

                    if (!open) {

                        setDeactivateSupplier(undefined);

                    }

                }}
                supplier={deactivateSupplier}
            />

        </div>

    );

}