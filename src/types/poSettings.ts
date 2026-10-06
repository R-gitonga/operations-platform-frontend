export interface PoSettings {
    id: number;
    overdue_grace_days: number;
    approaching_window_days: number;
    stalled_after_days: number;
    unresolved_defect_after_days: number;
    alert_sweep_interval_minutes: number;
    updated_at: string;
}

export interface UpdatePoSettingsRequest {
    overdue_grace_days: number;
    approaching_window_days: number;
    stalled_after_days: number;
    unresolved_defect_after_days: number;
    alert_sweep_interval_minutes: number;
}