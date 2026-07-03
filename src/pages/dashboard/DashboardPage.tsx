// import { useQuery } from "@tanstack/react-query";

import { useSummary } from "@/hooks/useSummary";

export default function Dashboard() {
    const {
        data,
        isLoading,
        error,
    } = useSummary();
    

    if (isLoading) {
        return <p>Loading Dashboard...</p>;

    }

    if (error) {
        return <p>Failed to load Dashboard.</p>;
    }

    return (
        <div className="space-y-2">
            <h1 className="text-3xl font-bold">
                Dashboard
            </h1>

            <div className="space-y-2">
                <p>Total Orders: {data?.total_orders}</p>

                <p>Total Quantity: {data?.total_quantity}</p>

                <h2 className="mt-4 font-semibold">
                    Status Counts
                </h2>

                {Object.entries(data?.status_counts ?? {}).map(
                    ([status, count]) => (
                        <p key={status}>
                            {status}: {count}
                        </p>
                    )
                )}
            </div>
        </div>
    );
}