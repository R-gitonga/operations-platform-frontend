import { Navigate, Route, Routes } from "react-router-dom";

import MainLayout from "@/layouts/MainLayout";
import Dashboard from "@/pages/dashboard/DashboardPage";
import CreateWorkshopOrder from "@/pages/orders/CreateOrderPage";
import OrdersPage from "@/pages/orders/OrdersPage";
import WorkshopOrderDetail from "@/pages/orders/OrderDetailPage";
import NotFound from "@/pages/NotFound";

export function AppRoutes() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/orders" element={<OrdersPage />} />
        <Route path="/orders/new" element={<CreateWorkshopOrder />} />
        <Route path="/orders/:id" element={<WorkshopOrderDetail />} />
      </Route>
      <Route path="/404" element={<NotFound />} />
      <Route path="*" element={<Navigate to="/404" replace />} />
    </Routes>
  );
}

export default AppRoutes;
