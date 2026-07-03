import WsoForm from "@/components/wso/WsoForm";

export default function CreateOrder() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold">
                    Create WorkshopOrder
                </h1>

                <p className="text-slate-600">
                    Create a new workshop order and add its line items.
                </p>
            </div>

            <WsoForm />
        </div>
    )
}