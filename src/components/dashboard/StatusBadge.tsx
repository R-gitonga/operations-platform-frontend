interface Props {
    status: string;
}

export default function StatusBadge({
    status,
}: Props) {

    const normalized =
        status.toLowerCase();

    const colours = {

        active:
            "bg-blu-100 text-blue-700",

        partial:
            "bg-yellow-100 text-yellow-700",

        completed:
            "bg-green-100 text-green-700",

        cancelled:
            "bg-red-100 text-red-700",
    };

    const colour =
        colours[
            normalized as keyof typeof colours
        ] ??
        "bg-slate-100 text-slate-700";

    return (

        <span
            className={`
                inline-flex
                rounded-full
                px-3
                py-1
                text-xs
                font-medium
                ${colour}
                `}
        >
            {status}
        </span>
    );
}