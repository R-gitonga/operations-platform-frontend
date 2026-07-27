export interface NotificationSetting {
    id: number;

    code: string;

    display_name: string;

    description: string | null;

    enabled: boolean;

    email_enabled: boolean;

    in_app_enabled: boolean;
}

export interface UpdateNotificationSettingRequest {
    enabled: boolean;
    email_enabled: boolean;
    in_app_enabled: boolean;
}

export interface NotificationRecipient {
    id: number;

    notification_event_id: number;

    code: string;

    event_name: string;

    display_name: string;

    email: string;

    enabled: boolean;
}

export interface NotificationEvent {
    id: number;

    code: string;

    display_name: string;

    description: string;
}

export interface CreateNotificationRecipientRequest {
    notification_event_id: number;

    display_name: string;

    email: string;

    enabled: boolean;
}