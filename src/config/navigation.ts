import {
    LayoutDashboard,
    ClipboardList,
    FilePlus2,
    ShoppingCart,
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
        title: "Purchase Orders",
        url: "/purchase-orders",
        icon: ShoppingCart,
    },
    {
        title: "New Purchase Order",
        url: "/purchase-orders/new",
        icon: FilePlus2,
    },
    {
        title: "Settings",
        url: "/settings",
        icon: Settings,
    },
];
