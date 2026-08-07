import { useNavigate } from "react-router-dom";

import {
  ClipboardList,
  CheckCircle2,
  Ban,
  Package,
  ArrowDownCircle,
  Boxes,
} from "lucide-react";

import { useDashboard } from "@/hooks/useDashboard";
import { useAttentionRequired } from "@/hooks/useAttentionRequired";

import KpiCard from "@/components/dashboard/KpiCard";
import DashboardSection from "@/components/dashboard/DashboardSection";
import ProductionStageCards from "@/components/dashboard/ProductionStageCards";
import ProgressStat from "@/components/dashboard/ProgressStat";
import AttentionRequired from "@/components/dashboard/AttentionRequired";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Dashboard() {
  const navigate = useNavigate();

  const { data, isLoading, error } = useDashboard();

  const {
    data: attentionItems,
    isLoading: attentionLoading,
    error: attentionError,
  } = useAttentionRequired();

  if (isLoading) return <p>Loading Dashboard...</p>;

  if (error || !data) return <p>Failed to load Dashboard.</p>;

  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>

        <p className="text-slate-500">Workshop Operations Overview</p>
      </div>

      {/* ========================================= */}

      <DashboardSection title="Production Overview">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <KpiCard
            title="Total Orders"
            value={data.orders.total}
            icon={ClipboardList}
            color="text-slate-600"
            onClick={() => navigate("/orders")}
          />

          <KpiCard
            title="Active"
            value={data.orders.active}
            icon={Package}
            color="text-blue-600"
            onClick={() => navigate("/orders?status=active")}
          />

          <KpiCard
            title="Completed"
            value={data.orders.completed}
            icon={CheckCircle2}
            color="text-green-600"
            onClick={() => navigate("/orders?status=completed")}
          />

          <KpiCard
            title="Cancelled"
            value={data.orders.cancelled}
            icon={Ban}
            color="text-red-600"
            onClick={() => navigate("/orders?status=cancelled")}
          />
        </div>
      </DashboardSection>

      {/* ========================================= */}

      <DashboardSection title="Production Stages">
        <ProductionStageCards
          stages={data.production_stages}
          onStageClick={(stage) =>
            navigate(`/production-stage/${stage.stage_id}`)
          }
        />
      </DashboardSection>

      {/* ========================================= */}

      <DashboardSection title="Production Progress">
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="space-y-4">
            <KpiCard
              title="Qty Raised"
              value={data.production.qty_raised}
              icon={Boxes}
              color="text-indigo-600"
            />

            <KpiCard
              title="Qty Received"
              value={data.production.qty_received}
              icon={ArrowDownCircle}
              color="text-green-600"
            />

            <KpiCard
              title="Outstanding"
              value={data.production.balance}
              icon={Package}
              color="text-indigo-600"
            />
          </div>

          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Production Progress</CardTitle>
              </CardHeader>

              <CardContent>
                <ProgressStat
                  title="Items Received"
                  value={data.production.qty_received}
                  total={data.production.qty_raised}
                />
              </CardContent>
            </Card>
          </div>
        </div>
      </DashboardSection>

      {/* ========================================= */}

      <DashboardSection title="Recent Production Activity">
        <Card>
          <CardContent className="p-0">
            <div className="divide-y">
              {data.recent_activity.map((activity) => (
                <button
                  key={`${activity.wso_id}-${activity.changed_at}`}
                  onClick={() => navigate(`/orders/${activity.wso_id}`)}
                  className="w-full p-5 text-left transition hover:bg-slate-50"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="font-semibold">
                        {activity.description}
                      </div>

                      <div className="text-sm text-slate-500">
                        WSO {activity.wso_number}
                      </div>

                      <div className="mt-2 text-sm">
                        moved to{" "}
                        <span className="font-medium text-indigo-600">
                          {activity.stage_name}
                        </span>
                      </div>
                    </div>

                    <div className="text-right text-sm text-slate-500">
                      <div>{activity.changed_by}</div>

                      <div>
                        {new Date(activity.changed_at).toLocaleString()}
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>
      </DashboardSection>

            {/* ========================================= */}

      <DashboardSection title="Attention Required">

        {attentionLoading ? (
          <Card>
            <CardContent className="p-6">
              <p className="text-sm text-slate-500">
                Checking for items that require attention...
              </p>
            </CardContent>
          </Card>
        ) : attentionError ? (
          <Card>
            <CardContent className="p-6">
              <p className="text-sm text-red-600">
                Unable to load attention-required items.
              </p>
            </CardContent>
          </Card>
        ) : (
          <AttentionRequired
            items={attentionItems ?? []}
            onItemClick={(item) =>
              navigate(`/orders/${item.wso_id}`)
            }
          />
        )}

      </DashboardSection>
    </div>
  );
}
