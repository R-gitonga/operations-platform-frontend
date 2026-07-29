import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import type { WsoHeaderFormData } from "@/types/wsoHeaderForm";

interface WsoHeaderFormProps {
    header: WsoHeaderFormData;

    setHeader: React.Dispatch<
        React.SetStateAction<WsoHeaderFormData>
    >;
}

export default function WsoHeaderForm({
    header,
    setHeader,
}: WsoHeaderFormProps) {
    return (
        <div className="rounded-lg border bg-white p-6 shadow-sm">

            <h2 className="mb-6 text-xl font-semibold">
                Workshop Order
            </h2>

            <div className="grid gap-6 md:grid-cols-2">

                <div>

                    <Label>Date Signed</Label>

                    <Input
                        type="date"
                        value={header.date_signed}
                        onChange={(e) =>
                            setHeader({
                                ...header,
                                date_signed: e.target.value,
                            })
                        }
                    />

                </div>

                <div>

                    <Label>WSO Number</Label>

                    <Input
                        value={header.wso_number}
                        onChange={(e) =>
                            setHeader({
                                ...header,
                                wso_number: e.target.value,
                            })
                        }
                    />

                </div>

                <div>

                    <Label>REQ Number</Label>

                    <Input
                        value={header.req_number}
                        onChange={(e) =>
                            setHeader({
                                ...header,
                                req_number: e.target.value,
                            })
                        }
                    />

                </div>

            </div>

        </div>
    );
}