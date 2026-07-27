import { useNavigate } from "react-router-dom";

import {
  ClipboardList,
  Clock3,
  CheckCircle2,
  Ban,
  Package,
  ArrowDownCircle,
  Boxes,
} from "lucide-react";

import { useDashboard } from "@/hooks/useDashboard";

import KpiCard from "@/components/dashboard/KpiCard";
import DashboardSection from "@/components/dashboard/DashboardSection";
import StatusBadge from "@/components/dashboard/StatusBadge";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ProgressStat from "@/components/dashboard/ProgressStat";

import OrderStatusChart from "@/components/dashboard/OrderStatusChart";
import LargestOutstandingChart from "@/components/dashboard/LargestOutstandingChart";

export default function Dashboard() {
  const navigate = useNavigate();

  const { data, isLoading, error } = useDashboard();

  if (isLoading) {
    return <p>Loading Dashboard...</p>;
  }

  if (error || !data) {
    return <p>Failed to load Dashboard.</p>;
  }

  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>

        <p className="text-slate-500">Workshop Operations Overview</p>
      </div>

      {/* ==================
                production overview
             ======================*/}

      <DashboardSection title="Production Overview">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <KpiCard
            title="Total Orders"
            value={data.total_orders}
            icon={ClipboardList}
            color="text-slate-600"
            onClick={() => navigate("/orders")}
          />

          <KpiCard
            title="Active"
            value={data.active_orders}
            icon={Package}
            color="text-blue-600"
            onClick={() => navigate("/orders?status=active")}
          />

          <KpiCard
            title="Partially Received"
            value={data.partial_orders}
            icon={Clock3}
            color="text-violet-600"
            onClick={() => navigate("/orders?status=partial")}
          />

          <KpiCard
            title="Completed"
            value={data.completed_orders}
            icon={CheckCircle2}
            color="text-green-600"
            onClick={() => navigate("/orders?status=completed")}
          />

          <KpiCard
            title="Cancelled"
            value={data.cancelled_orders}
            icon={Ban}
            color="text-red-600"
            onClick={() => navigate("/orders?status=cancelled")}
          />
        </div>
      </DashboardSection>

      {/* Production qunatities */}

      <DashboardSection title="Production Quantities">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <KpiCard
            title="Qty Raised"
            value={data.total_qty_raised}
            icon={Boxes}
            color="text-indigo-600"
          />

          <KpiCard
            title="Qty Received"
            value={data.total_qty_received}
            icon={ArrowDownCircle}
            color="text-green-600"
          />

          <KpiCard
            title="Outstanding"
            value={data.total_balance}
            icon={Package}
            color="text-indigo-600"
          />
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Production Progress</CardTitle>
          </CardHeader>

          <CardContent>
            <ProgressStat
              title="Items Received"
              value={data.total_qty_received}
              total={data.total_qty_raised}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Order Status Distribution</CardTitle>
          </CardHeader>

          <CardContent>
            <OrderStatusChart
              active={data.active_orders}
              partial={data.partial_orders}
              completed={data.completed_orders}
              cancelled={data.cancelled_orders}
            />
          </CardContent>
        </Card>
      </DashboardSection>

      {/* ==========================
                    Dashboard Tables
            =========================== */}

      <div className="grid lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Workshop Orders</CardTitle>
          </CardHeader>

          <CardContent>
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2">WSO</th>

                  <th className="text-left py-2">Status</th>
                </tr>
              </thead>

              <tbody>
                {data.recent_orders.map((order) => (
                  <tr
                    key={order.id}
                    className="border-b hover:bg-slate-50 cursor-pointer"
                    onClick={() => navigate(`/orders/${order.id}`)}
                  >
                    <td className="py-3">{order.wso_number}</td>

                    <td>
                      <StatusBadge status={order.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Largest Outstanding Orders</CardTitle>
          </CardHeader>

          <CardContent>
            <p className="text-sm text-slate-500 mb-4">
              Click any bar to open the Workshop Order.
            </p>

            <LargestOutstandingChart data={data.largest_outstanding} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
