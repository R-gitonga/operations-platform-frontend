import { useNavigate } from "react-router-dom";

import { ArrowRight, Bell, Factory, Users } from "lucide-react";

import { useAuth } from "@/auth/AuthProvider";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import PartialReceivingSettingsCard from "@/components/dashboard/PartialReceivingSettingsCard";

export default function SettingsPage() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const isAdmin = user?.role === "admin";

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Settings</h1>

        <p className="text-slate-500">
          Configure production workflow, notifications and system behaviour.
        </p>
      </div>

      {/* ----------------------------------------- */}
      {/* Production */}
      {/* ----------------------------------------- */}

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Production</h2>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Factory className="h-5 w-5" />
              Production Stages
            </CardTitle>

            <CardDescription>
              Configure production stages, colours, expected durations,
              attention rules and workflow order.
            </CardDescription>
          </CardHeader>

          <CardContent>
            <Button
              onClick={() => navigate("/settings/production-stages")}
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
        <h2 className="text-xl font-semibold">Notifications</h2>

        <div className="grid gap-4 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Notification Behaviour
              </CardTitle>

              <CardDescription>
                Choose which notification events are active and whether they are
                sent by email or in-app.
              </CardDescription>
            </CardHeader>

            <CardContent>
              <Button
                onClick={() => navigate("/settings/notification-behaviour")}
                className="gap-2"
              >
                Open
                <ArrowRight className="h-4 w-4" />
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Notification Recipients
              </CardTitle>

              <CardDescription>
                Decide who receives notifications for each event.
              </CardDescription>
            </CardHeader>

            <CardContent>
              <Button
                onClick={() => navigate("/settings/notification-recipients")}
                className="gap-2"
              >
                Open
                <ArrowRight className="h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* ----------------------------------------- */}
      {/* Administration */}
      {/* ----------------------------------------- */}

      {isAdmin && (
        <section className="space-y-4">
          <h2 className="text-xl font-semibold">Administration</h2>

          {/* Wrapper for side-by-side layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  User Management
                </CardTitle>

                <CardDescription>
                  Create and manage user accounts and assign system access
                  roles.
                </CardDescription>
              </CardHeader>

              <CardContent>
                <Button
                  onClick={() => navigate("/settings/users")}
                  className="gap-2"
                >
                  Open
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Partial Receiving threshold
                </CardTitle>

                <CardDescription>Attention threshold</CardDescription>
              </CardHeader>

              <CardContent>
                <PartialReceivingSettingsCard />
              </CardContent>
            </Card>
          </div>
        </section>
      )}
    </div>
  );
}
