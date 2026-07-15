import { api } from "@/lib/api";

export async function uploadAttachment(
    id: number,
    file: File,
) {
    const formData = new FormData();

    formData.append("file", file);

    const response = await api.post(
        `/wso/${id}/attachment`,
        formData,
        {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        }
    );

    return response.data;
}