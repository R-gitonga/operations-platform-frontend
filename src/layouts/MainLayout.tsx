import { Outlet } from "react-router-dom";

import AppSidebar from "@/components/layout/AppSidebar";
// import Header from "@/components/layout/Header";

import {
    SidebarProvider, SidebarInset, 
} from "@/components/ui/sidebar";


export default function MainLayout() {
    return (
        <SidebarProvider>
            <AppSidebar />

            <SidebarInset>
                {/* <Header /> */}

                <main className="flex-1 p-6">
                    <Outlet />
                </main>
            </SidebarInset>
        </SidebarProvider>
    );
}
