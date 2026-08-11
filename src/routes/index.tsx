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
import UserManagementPage from "@/pages/settings/UserManagementPage";

import NotFound from "@/pages/NotFound";
import LoginPage from "@/pages/auth/LoginPage";

import RequireAuth from "@/auth/RequireAuth";
import RequireAdmin from "@/auth/RequireAdmin";

export function AppRoutes() {
    return (
        <Routes>
            {/* Public routes */}

            <Route
                path="/login"
                element={<LoginPage />}
            />

            {/* Protected application */}

            <Route element={<RequireAuth />}>
                <Route element={<MainLayout />}>
                    {/* General authenticated routes */}

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

                    {/* Admin-only routes */}

                    <Route element={<RequireAdmin />}>
                        <Route
                            path="/settings/users"
                            element={<UserManagementPage />}
                        />
                    </Route>
                </Route>
            </Route>

            {/* Public fallback */}

            <Route
                path="/404"
                element={<NotFound />}
            />

            <Route
                path="*"
                element={
                    <Navigate
                        to="/404"
                        replace
                    />
                }
            />
        </Routes>
    );
}

export default AppRoutes;