import { useWsos } from "@/hooks/useWsos"

import type { WsoOrder } from "@/types/wso";

import { Link } from "react-router-dom";

export default function OrdersPage() {
    const {
        data,
        isLoading,
        error,
    } = useWsos();

    if (isLoading) {
        return <p>Loading Orders...</p>;
    }

    if (error) {
        return <p>Failed to load Orders.</p>;
    }

    return (
        <div className="space-y-4">
            <h1 className="text-3xl font-bold">Workshop Orders</h1>

            {data && data.length > 0 ? (
                <div className="space-y-3">
                    {data.map((order: WsoOrder) => (

                        <Link  key={order.id} to={`/orders/${order.id}`}>
                            <div className="
                                    rounded-lg 
                                    border 
                                    border-slate-200 
                                    bg-white 
                                    p-4 
                                    shadow-sm
                                    cursor-pointer
                                    transition
                                    hover:border-slate-300
                                    hover:shadow-md
                                    ">
                                <div className="flex items-center justify-between gap-4">
                                    <div>
                                        <h2 className="text-lg font-semibold">{order.wso_number}</h2>
                                        <p className="text-sm text-slate-600">
                                            {order.description ?? "No description provided"}
                                        </p>
                                    </div>
                                    <span className="rounded-full bg-slate-100 px-2.5 py-1 text-sm text-slate-700">
                                        {order.status}
                                    </span>
                                </div>
                            <p className="mt-2 text-sm text-slate-500">
                                Req #: {order.req_number ?? "N/A"}
                            </p>
                            </div>
                        </Link>
                        
                    ))}
                </div>
            ) : (
                <p>No orders found.</p>
            )}
        </div>
    );
}