export function formatTimeInStage(
    timestamp?: string | null,
): string {

    if (!timestamp) {

        return "Unknown";
    }

    const changed = new Date(timestamp);

    const now = new Date();

    const diffMs = now.getTime() - changed.getTime();

    const minutes = Math.floor(diffMs / 60000);

    if (minutes < 60) {
        return `${minutes} min`;
    }

    const hours = Math.floor(minutes / 60);

    if (hours < 24) {
        return `${hours} hr${hours === 1 ? "" : "s"}`;
    }

    const days = Math.floor(hours / 24);

    return`${days} day${days === 1 ? "" : "s"}`;
}