import { useNotificationSettings } from "@/hooks/useNotificationSettings";
import { useNotificationRecipients } from "@/hooks/useNotificationRecipients";

import NotificationSettingsTable from "@/components/settings/NotificationSettingsTable";
import NotificationRecipientsTable from "@/components/settings/NotificationRecipientsTable";

export default function SettingsPage() {
  const {
    data,

    isLoading,

    error,
  } = useNotificationSettings();

  const { data: recipients, isLoading: recipientsLoading } =
    useNotificationRecipients();

  if (isLoading) {
    return <p>Loading settings...</p>;
  }

  if (error) {
    return <p>Failed to load settings.</p>;
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Notification Settings</h1>

      <NotificationSettingsTable settings={data ?? []} />

      <h1 className="text-3xl font-bold">Notification Recipients Settings</h1>

      {recipients && (
        <NotificationRecipientsTable
          recipients={recipients}
        />
      )}
    </div>
  );
}
