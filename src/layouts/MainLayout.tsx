import { Outlet } from "react-router-dom";
import { Menu, X } from "lucide-react";

import AppSidebar from "@/components/layout/AppSidebar";

import {
    SidebarProvider,
    SidebarInset,
    useSidebar,
} from "@/components/ui/sidebar";

function MobileNavigationTrigger() {
    const { isMobile, openMobile, toggleSidebar } = useSidebar();

    if (!isMobile) {
        return null;
    }

    return (
        <header className="flex h-14 shrink-0 items-center gap-3 border-b bg-background px-4 md:hidden">
            <button
                type="button"
                onClick={toggleSidebar}
                aria-label={openMobile ? "Close navigation menu" : "Open navigation menu"}
                aria-expanded={openMobile}
                className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-border text-foreground transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
                {openMobile ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>

            <div className="min-w-0">
                <p className="truncate text-sm font-semibold">Image First Schools</p>
                <p className="truncate text-xs text-muted-foreground">Workshop Order Tracker</p>
            </div>
        </header>
    );
}

export default function MainLayout() {
    return (
        <SidebarProvider>
            <AppSidebar />

            <SidebarInset className="min-w-0">
                <MobileNavigationTrigger />

                <main className="min-w-0 flex-1 overflow-x-hidden p-4 sm:p-6">
                    <Outlet />
                </main>
            </SidebarInset>
        </SidebarProvider>
    );
}
