import NotificationSettingsTable from "@/components/settings/NotificationSettingsTable";
import { useNotificationSettings } from "@/hooks/useNotificationSettings";

export default function NotificationBehaviourPage() {
    const { data: settings = [], isLoading, error } = useNotificationSettings();

    if (isLoading) {
        return <p>Loading notification behaviour...</p>;
    }

    if (error) {
        return <p>Failed to load notification behaviour.</p>;
    }

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold">Notification Behaviour</h1>

                <p className="text-slate-500">
                    Configure which notification events are active and how they are delivered.
                </p>
            </div>

            <NotificationSettingsTable settings={settings} />
        </div>
    );
}
