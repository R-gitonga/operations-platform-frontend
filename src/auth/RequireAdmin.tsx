import { Navigate, Outlet, useLocation } from "react-router-dom";

import { useAuth } from "@/auth/AuthProvider";

export default function RequireAdmin() {
    const { user, isLoading } = useAuth();
    const location = useLocation();

    if (isLoading) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <p className="text-sm text-slate-500">
                    Loading...
                </p>
            </div>
        );
    }

    if (!user || user.role !== "admin") {
        return (
            <Navigate
                to="/"
                replace
                state={{ from: location.pathname }}
            />
        );
    }

    return <Outlet />;
}