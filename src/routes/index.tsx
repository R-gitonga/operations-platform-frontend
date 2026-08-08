import { Navigate, Route, Routes } from "react-router-dom";

import MainLayout from "@/layouts/MainLayout";

import Dashboard from "@/pages/dashboard/DashboardPage";

import OrdersPage from "@/pages/orders/OrdersPage";
import CreateWorkshopOrder from "@/pages/orders/CreateOrderPage";
import WorkshopOrderDetail from "@/pages/orders/OrderDetailPage";

import ProductionStagePage from "@/pages/dashboard/ProductionStagePage";

import ProductionStagesPage from "@/pages/settings/ProductionStagesPage";
import NotificationBehaviourPage from "@/pages/settings/NotificationBehaviourPage";
import NotificationRecipientsPage from "@/pages/settings/NotificationRecipientsPage";

import SettingsPage from "@/pages/settings/SettingsPage";

import NotFound from "@/pages/NotFound";
import LoginPage from "@/pages/auth/LoginPage";

export function AppRoutes() {
    return (
        <Routes>

            <Route element={<MainLayout />}>

                <Route
                    path="/"
                    element={<Dashboard />}
                />

                <Route
                    path="/orders"
                    element={<OrdersPage />}
                />

                <Route
                    path="/orders/new"
                    element={<CreateWorkshopOrder />}
                />

                <Route
                    path="/orders/:id"
                    element={<WorkshopOrderDetail />}
                />

                <Route
                    path="/production-stage/:stageId"
                    element={<ProductionStagePage />}
                />

                <Route
                    path="/settings"
                    element={<SettingsPage />}
                />

                <Route
                    path="/settings/production-stages"
                    element={<ProductionStagesPage />}
                />

                <Route
                    path="/settings/notification-behaviour"
                    element={<NotificationBehaviourPage />}
                />

                <Route
                    path="/settings/notification-recipients"
                    element={<NotificationRecipientsPage />}
                />

            </Route>

            <Route
                path="/login"
                element={<LoginPage />}
            />

            <Route
                path="/404"
                element={<NotFound />}
            />

            <Route
                path="*"
                element={<Navigate to="/404" replace />}
            />

        </Routes>
    );
}

export default AppRoutes;
