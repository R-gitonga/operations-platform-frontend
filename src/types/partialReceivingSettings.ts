export interface PartialReceivingSettings {
    id: number;
    attention_after_days: number;
    updated_at: string;
}

export interface UpdatePartialReceivingSettings {
    attention_after_days: number;
}