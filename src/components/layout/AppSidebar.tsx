import {
    Sidebar,
    SidebarContent,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuItem,
    SidebarMenuButton,
    SidebarFooter,
} from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import Header from "@/components/layout/Header";
import { navigation } from "@/config/navigation";
import { useAuth } from "@/auth/AuthProvider";

import { NavLink, useLocation } from "react-router-dom";
import { LogOut } from "lucide-react";

export function AppSidebar() {
    const location = useLocation();
    const { user, logout } = useAuth();

    const handleLogout = async () => {
        try {
            await logout();
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };

    return (
        <Sidebar className="border-r border-slate-700 bg-slate-900 text-slate-100">
            <SidebarHeader className="bg-slate-900">
                <Header />
                <Separator className="bg-slate-700" />
            </SidebarHeader>

            <SidebarContent className="bg-slate-900 px-2 py-2">
                <SidebarMenu>
                    {navigation.map((item) => {
                        const isActive =
                            item.url === "/"
                                ? location.pathname === "/"
                                : location.pathname === item.url ||
                                  location.pathname.startsWith(`${item.url}/`);

                        return (
                            <SidebarMenuItem key={item.title}>
                                <SidebarMenuButton asChild>
                                    <NavLink
                                        to={item.url}
                                        end={item.url === "/"}
                                        className={({ isActive: linkIsActive }) => {
                                            const active =
                                                isActive || linkIsActive;

                                            return [
                                                "flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors",
                                                active
                                                    ? "bg-sky-700 text-white font-medium"
                                                    : "text-slate-200 hover:bg-slate-100 hover:text-slate-900",
                                            ].join(" ");
                                        }}
                                    >
                                        <item.icon className="h-4 w-4" />
                                        <span>{item.title}</span>
                                    </NavLink>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        );
                    })}
                </SidebarMenu>
            </SidebarContent>

            <SidebarFooter className="bg-slate-900 px-2 pb-3">
                <Separator className="mb-3 bg-slate-700" />

                <div className="flex items-center gap-2 px-3 py-2">
                    <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-medium text-slate-100">
                            {user?.display_name ?? "User"}
                        </p>

                        <p className="truncate text-xs text-slate-400">
                            {user?.role ?? ""}
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={handleLogout}
                        title="Sign out"
                        aria-label="Sign out"
                        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md text-slate-300 transition-colors hover:bg-red-600 hover:text-white"
                    >
                        <LogOut className="h-4 w-4" />
                    </button>
                </div>
            </SidebarFooter>
        </Sidebar>
    );
}

export default AppSidebar;