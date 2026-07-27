import { useUpdateNotificationSetting } from "@/hooks/useUpdateNotificationSetting";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Switch } from "@/components/ui/switch";

import { Loader2, CheckCircle2, CircleOff } from "lucide-react";

import type { NotificationSetting } from "@/types/settings";

import { useState } from "react";

interface Props {
  settings: NotificationSetting[];
}

export default function NotificationSettingsTable({ settings }: Props) {
  const mutation = useUpdateNotificationSetting();

  const [updatingId, setUpdatingId] = useState<number | null>(null);

  const updateSetting = (
    id: number,
    current: {
      enabled: boolean;
      email_enabled: boolean;
      in_app_enabled: boolean;
    },
    changes: Partial<{
      enabled: boolean;
      email_enabled: boolean;
      in_app_enabled: boolean;
    }>,
  ) => {
    setUpdatingId(id);

    mutation.mutate(
      {
        id,
        request: {
          ...current,
          ...changes,
        },
      },
      {
        onSettled: () => {
          setUpdatingId(null);
        },
      },
    );
  };

  const renderDeliverySwitch = (
    setting: NotificationSetting,
    type: "email" | "in_app",
  ) => {
    if (!setting.enabled) {
      return <span className="text-slate-400 text-lg">&mdash;</span>;
    }

    const checked =
      type === "email" ? setting.email_enabled : setting.in_app_enabled;

    return (
      <Switch
        checked={checked}
        disabled={updatingId === setting.id}
        onCheckedChange={(checked) =>
          updateSetting(
            setting.id,
            {
              enabled: setting.enabled,
              email_enabled: setting.email_enabled,
              in_app_enabled: setting.in_app_enabled,
            },
            type === "email"
              ? { email_enabled: checked }
              : { in_app_enabled: checked },
          )
        }
      />
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Notification Behaviour</CardTitle>
      </CardHeader>

      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Event</TableHead>

              <TableHead>Enabled</TableHead>

              <TableHead>Email</TableHead>

              <TableHead>In-App</TableHead>
              <TableHead className="w-28">Status</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {settings.map((setting) => (
              <TableRow
                key={setting.id}
                className={
                  updatingId === setting.id
                    ? "opacity-60 transition-opacity"
                    : ""
                }
              >
                <TableCell>
                  <div>
                    <p className="font-medium">{setting.display_name}</p>

                    <p className="text-xs text-slate-500">
                      {setting.description}
                    </p>
                  </div>
                </TableCell>

                <TableCell>
                  <Switch
                    checked={setting.enabled}
                    disabled={updatingId === setting.id}
                    onCheckedChange={(checked) =>
                      updateSetting(
                        setting.id,
                        {
                          enabled: setting.enabled,
                          email_enabled: setting.email_enabled,
                          in_app_enabled: setting.in_app_enabled,
                        },
                        {
                          enabled: checked,
                        },
                      )
                    }
                  />
                </TableCell>

                <TableCell>{renderDeliverySwitch(setting, "email")}</TableCell>

                <TableCell>{renderDeliverySwitch(setting, "in_app")}</TableCell>

                <TableCell>
                  {updatingId === setting.id ? (
                    <div className="flex items-center gap-2 text-sky-600">
                      <Loader2 className="h-4 w-4 animate-spin" />

                      <span className="text-sm font-medium">Saving...</span>
                    </div>
                  ) : setting.enabled ? (
                    <div className="flex items-center gap-2 text-emerald-600">
                      <CheckCircle2 className="h-4 w-4" />

                      <span className="text-sm">Active</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 text-slate-500">
                      <CircleOff className="h-4 w-4" />

                      <span className="text-sm">Disabled</span>
                    </div>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
