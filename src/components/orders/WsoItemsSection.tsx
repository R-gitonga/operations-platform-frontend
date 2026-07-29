import type { WsoItemDetail } from "@/types/wso";

import WsoItemCard from "./WsoItemCard";

interface Props {
    items: WsoItemDetail[];
    wsoStatus: string;
}

export default function WsoItemsSection({
    items,
    wsoStatus,
}: Props) {

    if (items.length === 0) {
        return (
            <p className="text-muted-foreground">
                No production items.
            </p>
        );
    }

    return (
        <div className="space-y-6">

            {items.map(item => (

                <WsoItemCard
                    key={item.id}
                    item={item}
                    wsoStatus={wsoStatus}
                />

            ))}

        </div>
    );
}