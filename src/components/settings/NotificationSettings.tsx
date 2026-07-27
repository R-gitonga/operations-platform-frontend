import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

export default function NotificationSettings() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>
                    Notification Settings
                </CardTitle>
            </CardHeader>

            <CardContent className="space-y-4">

                <p className="text-slate-600">
                    This section will allow admins to configure:
                </p>
                
                <ul className="list-disc pl-6 space-y-2 text-slate-600">
                    <li>Email Notifications</li>
                    <li>In-App Notifications</li>
                    <li>Notification Recipients</li>
                    <li>Email Templates</li>
                    <li>Notification History</li>
                </ul>

                <div className="rounded-md border bg-slate-50 p-4 text-sm text-slate-500">
                    Notifacation configuration module coming soon....
                </div>
            </CardContent>
        </Card>
    );
}