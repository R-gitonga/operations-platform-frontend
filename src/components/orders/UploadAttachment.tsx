import { useState } from "react";
import { Button } from "../ui/button";

import { useUploadAttachment } from "@/hooks/useUploadAttachment";
import { Input } from "../ui/input";

import { useRef } from "react";

interface UploadAttachmentProps {
    wsoId: number;
}


export default function UploadAttachment({
    wsoId,
}: UploadAttachmentProps) {

    const fileInputRef = useRef<HTMLInputElement>(null);

    const [file, setFile] = useState<File | null>(null);

    const mutation = useUploadAttachment();

    function handleUpload() {
        if (!file) {
            alert("Please choose a file first.");
            return;
        }

        mutation.mutate(
            {
                id: wsoId,
                file,
            },
            {
                onSuccess: () => {
                    setFile(null);

                    if (fileInputRef.current) {
                        fileInputRef.current.value = "";
                    }
                    alert("Attachment uploaded successfully.");
                },

                onError: (error) => {
                    console.error(error);
                    alert("Failed to upload attachment.")
                },
            }
        );
    }

    return (
        <div className="space-y-4">

            <Input
                ref={fileInputRef}
                type="file"
                onChange={(e) =>
                    setFile(e.target.files?.[0] ?? null)
                }
            />

            <Button
                onClick={handleUpload}
                disabled={!file || mutation.isPending}
            >
                {mutation.isPending ? "Uploading" : "Upload"}
            </Button>
        </div>
    );
}