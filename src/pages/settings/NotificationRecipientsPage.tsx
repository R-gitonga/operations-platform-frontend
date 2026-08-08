import NotificationRecipientsTable from "@/components/settings/NotificationRecipientsTable";
import { useNotificationRecipients } from "@/hooks/useNotificationRecipients";

export default function NotificationRecipientsPage() {
    const { data: recipients = [], isLoading, error } = useNotificationRecipients();

    if (isLoading) {
        return <p>Loading notification recipients...</p>;
    }

    if (error) {
        return <p>Failed to load notification recipients.</p>;
    }

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold">Notification Recipients</h1>

                <p className="text-slate-500">
                    Manage the people who receive each type of notification.
                </p>
            </div>

            <NotificationRecipientsTable recipients={recipients} />
        </div>
    );
}
