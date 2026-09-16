import { useRef, useState } from "react";

import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useUploadPurchaseOrderAttachment } from "@/hooks/useUploadPurchaseOrderAttachment";
import { getApiErrorMessage } from "@/lib/apiError";

interface Props {
    purchaseOrderId: number;
}

export default function UploadPurchaseOrderAttachment({
    purchaseOrderId,
}: Props) {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [file, setFile] = useState<File | null>(null);
    const mutation = useUploadPurchaseOrderAttachment();

    function handleUpload() {
        if (!file) {
            toast.error("Please choose a file first.");
            return;
        }

        mutation.mutate(
            { id: purchaseOrderId, file },
            {
                onSuccess: () => {
                    toast.success("Attachment uploaded successfully.");
                    setFile(null);

                    if (fileInputRef.current) {
                        fileInputRef.current.value = "";
                    }
                },
                onError: (error) => {
                    toast.error(getApiErrorMessage(error));
                },
            },
        );
    }

    return (
        <div className="space-y-2">
            <Input
                ref={fileInputRef}
                type="file"
                onChange={(event) => setFile(event.target.files?.[0] ?? null)}
            />

            <Button
                onClick={handleUpload}
                disabled={!file || mutation.isPending}
            >
                {mutation.isPending ? "Uploading..." : "Upload"}
            </Button>
        </div>
    );
}
