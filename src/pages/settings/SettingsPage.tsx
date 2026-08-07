import { useNavigate } from "react-router-dom";

import { ArrowRight, Factory } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import { useNotificationSettings } from "@/hooks/useNotificationSettings";
import { useNotificationRecipients } from "@/hooks/useNotificationRecipients";

import NotificationSettingsTable from "@/components/settings/NotificationSettingsTable";
import NotificationRecipientsTable from "@/components/settings/NotificationRecipientsTable";

export default function SettingsPage() {

    const navigate = useNavigate();

    const {
        data,
        isLoading,
        error,
    } = useNotificationSettings();

    const {
        data: recipients,
    } = useNotificationRecipients();

    if (isLoading) {
        return <p>Loading settings...</p>;
    }

    if (error) {
        return <p>Failed to load settings.</p>;
    }

    return (

        <div className="space-y-8">

            <div>

                <h1 className="text-3xl font-bold">
                    Settings
                </h1>

                <p className="text-slate-500">
                    Configure production workflow,
                    notifications and system behaviour.
                </p>

            </div>

            {/* ----------------------------------------- */}
            {/* Production */}
            {/* ----------------------------------------- */}

            <section className="space-y-4">

                <h2 className="text-xl font-semibold">
                    Production
                </h2>

                <Card>

                    <CardHeader>

                        <CardTitle className="flex items-center gap-2">

                            <Factory className="h-5 w-5" />

                            Production Stages

                        </CardTitle>

                        <CardDescription>

                            Configure production stages,
                            colours, expected durations,
                            attention rules and workflow order.

                        </CardDescription>

                    </CardHeader>

                    <CardContent>

                        <Button
                            onClick={() =>
                                navigate("/settings/production-stages")
                            }
                            className="gap-2"
                        >
                            Open

                            <ArrowRight className="h-4 w-4" />

                        </Button>

                    </CardContent>

                </Card>

            </section>

            {/* ----------------------------------------- */}
            {/* Notifications */}
            {/* ----------------------------------------- */}

            <section className="space-y-4">

                <h2 className="text-xl font-semibold">
                    Notifications
                </h2>

                <NotificationSettingsTable
                    settings={data ?? []}
                />

                {recipients && (

                    <NotificationRecipientsTable
                        recipients={recipients}
                    />

                )}

            </section>

        </div>

    );
}