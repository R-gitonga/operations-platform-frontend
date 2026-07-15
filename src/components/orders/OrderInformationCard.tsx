import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import { Button } from "../ui/button";

import type { WsoDetail } from "@/types/wso";
import EditORderDialog from "./EditOrderDialog";
import CancelWsoDialog from "./CancelWsoDialog";
import UploadAttachment from "./UploadAttachment";

interface Props {
    order: WsoDetail;
    categoryName?: string;
}

function DetailRow({
    label,
    value,
}: {
    label: string;
    value: React.ReactNode;
}) {
    return (
        <div className="grid grid-cols-[180px_1fr] gap-4 py-2 border-b last:border-b-0">
            <span className="font-medium text-slate-600">
                {label}
            </span>

            <span>
                {value || "-"}
            </span>
        </div>
    );
}

export default function OrderInformationCard({
    order,
    categoryName,
}: Props) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl font-semibold">
                            Workshop Order
                        </h2>

                        <div className="flex gap-2">

                            <UploadAttachment
                                wsoId={order.id}
                            />

                            <EditORderDialog order={order}/>


                            {order.status !== "Cancelled" && (
                                <CancelWsoDialog
                                    id={order.id}
                                    trigger={
                                        <Button variant="destructive" >
                                            Cancel
                                        </Button>
                                    }
                                />
                            )}
                        </div>

                    </div>
                </CardTitle>
            </CardHeader>

            <CardContent>
                <DetailRow
                    label="Category"
                    value={categoryName}
                />

                <DetailRow
                    label="Date Signed"
                    value={order.date_signed}
                />

                <DetailRow
                    label="WSO Number"
                    value={order.wso_number}
                />

                <DetailRow
                    label="REQ Number"
                    value={order.req_number}
                />

                <DetailRow
                    label="Description"
                    value={order.description}
                />

                <DetailRow
                    label="Design Code"
                    value={order.design_code}
                />

                <DetailRow
                    label="Fabric Code"
                    value={order.fabric_code}
                />

                <DetailRow
                    label="Remarks"
                    value={order.remarks}
                />

                <DetailRow
                    label="Attachment"
                    value={
                        order.attachment_name ? (
                            <a
                                href={`http://localhost:3000/${order.attachment_path}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 hover:underline"
                            >
                                🗄️{order.attachment_name}
                            </a>
                        ) : (
                            <span className="text-slate-400">
                                No attachment
                            </span>
                        )
                    }
                />

            </CardContent>
        </Card>
    );
}