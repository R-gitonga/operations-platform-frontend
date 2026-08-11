import {
    LayoutDashboard,
    ClipboardList,
    FilePlus2,
    Settings,
} from "lucide-react";

export const navigation = [
    {
        title: "Dashboard",
        url: "/",
        icon: LayoutDashboard,
    },
    {
        title: "Workshop Orders",
        url: "/orders",
        icon: ClipboardList,
    },
    {
        title: "New Workshop Order",
        url: "/orders/new",
        icon: FilePlus2,
    },
    {
        title: "Settings",
        url: "/settings",
        icon: Settings,
    },
];