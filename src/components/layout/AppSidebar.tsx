import { Sidebar, SidebarContent, SidebarHeader, SidebarMenu, SidebarMenuItem, SidebarMenuButton } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import Header from "@/components/layout/Header";
import { navigation } from "@/config/navigation";

import { NavLink, useLocation } from "react-router-dom";

export function AppSidebar() {
    const location = useLocation();

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
                                : location.pathname === item.url || location.pathname.startsWith(`${item.url}/`);

                        return (
                            <SidebarMenuItem key={item.title}>
                                <SidebarMenuButton asChild>
                                    <NavLink
                                        to={item.url}
                                        end={item.url === "/"}
                                        className={({ isActive: linkIsActive }) => {
                                            const active = isActive || linkIsActive;
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
        </Sidebar>
    );
}

export default AppSidebar;
