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
import BrandingTypesPage from "@/pages/settings/BrandingTypesPage";
import BrandingLocationsPage from "@/pages/settings/BrandingLocationsPage";
import SuppliersPage from "@/pages/settings/SuppliersPage";
import PurchaseOrdersPage from "@/pages/purchase-orders/PurchaseOrdersPage";
import PurchaseOrderDetailPage from "@/pages/purchase-orders/PurchaseOrderDetailPage";
import CreatePurchaseOrderPage from "@/pages/purchase-orders/CreatePurchaseOrderPage";
import PurchaseOrderDashboardPage from "@/pages/purchase-orders/PurchaseOrderDashboardPage";

import NotFound from "@/pages/NotFound";
import LoginPage from "@/pages/auth/LoginPage";
import ForgotPasswordPage from "@/pages/auth/ForgotPasswordPage";
import ResetPasswordPage from "@/pages/auth/ResetPasswordPage";

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

            <Route
                path="/forgot-password"
                element={<ForgotPasswordPage />}
            />

            <Route
                path="/reset-password"
                element={<ResetPasswordPage />}
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
                        path="/purchase-orders"
                        element={<PurchaseOrdersPage />}
                    />

                    <Route
                        path="/purchase-orders/new"
                        element={<CreatePurchaseOrderPage />}
                    />

                    {/* Registered before /purchase-orders/:id so
                        "dashboard" isn't swallowed as an :id param. */}
                    <Route
                        path="/purchase-orders/dashboard"
                        element={<PurchaseOrderDashboardPage />}
                    />

                    <Route
                        path="/purchase-orders/:id"
                        element={<PurchaseOrderDetailPage />}
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

                        <Route
                            path="/settings/branding-types"
                            element={<BrandingTypesPage />}
                        />

                        <Route
                            path="/settings/branding-locations"
                            element={<BrandingLocationsPage />}
                        />

                        <Route
                            path="/settings/suppliers"
                            element={<SuppliersPage />}
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