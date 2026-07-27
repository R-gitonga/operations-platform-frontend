import type { ReactNode } from "react";

interface Props {
    title: string;
    children: ReactNode;
}

export default function DashboardSection({
    title,
    children,
}: Props) {

    return (

        <section className="space-y-4">
            <h2 className="text-xl font-semibold">
                {title}
            </h2>

            {children}
        </section>
    );
}