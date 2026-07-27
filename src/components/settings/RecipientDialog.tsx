import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";

import { Label } from "@/components/ui/label";

import { Switch } from "@/components/ui/switch";

import { useState } from "react";
import { useEffect } from "react";

import { useCreateNotificationRecipient } from "@/hooks/useCreateNotificationRecipient";
import { useUpdateNotificationRecipient } from "@/hooks/useUpdateNotificationRecipient";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useNotificationEvents } from "@/hooks/useNotificationEvents";
import type { NotificationRecipient } from "@/types/settings";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;

  recipient?: NotificationRecipient;
}

export default function RecipientDialog({
  open,
  onOpenChange,
  recipient,
}: Props) {
  const { data: events } = useNotificationEvents();

  const [displayName, setDisplayName] = useState("");

  const [email, setEmail] = useState("");

  const [eventId, setEventId] = useState("");

  const [enabled, setEnabled] = useState(true);

  const createRecipient = useCreateNotificationRecipient();

  const updateRecipient = useUpdateNotificationRecipient();

  useEffect(() => {
    if (!open) return;

    if (recipient) {
      setDisplayName(recipient.display_name);
      setEmail(recipient.email);
      setEventId(recipient.notification_event_id.toString());
      setEnabled(recipient.enabled);
    } else {
      resetForm();
    }
  }, [recipient, open]);

  const resetForm = () => {
    setDisplayName("");
    setEmail("");
    setEventId("");
    setEnabled(true);
  };

  const isSaving =
      createRecipient.isPending ||
      updateRecipient.isPending;

  const handleSubmit = () => {
    if (
        displayName.trim() === "" || 
        email.trim() === "" || 
        eventId === "") {
      return;
    }

    const request = {
      notification_event_id: Number(eventId),
      display_name: displayName,
      email,
      enabled,
    };

    if (recipient) {
      updateRecipient.mutate(
        {
          id: recipient.id,
          request,
        },
        {
          onSuccess: () => {
            resetForm();
            onOpenChange(false);
          },
        },
      );
    } else {
      createRecipient.mutate(request, {
        onSuccess: () => {
          resetForm();
          onOpenChange(false);
        },
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>
            {recipient
              ? "Edit Notification Recipient"
              : "Add notification Recipient"}
          </DialogTitle>

          <DialogDescription>
            {recipient
              ? "Update an existing notification recipient."
              : "Configure who should receive notification emails."}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-5 py-2">
          <div className="space-y-2">
            <Label>Recipient Name</Label>

            <Input
              placeholder="Retail Stores"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label>Email Address</Label>

            <Input
              placeholder="retail-stores@image-first.biz"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label>Notification Event</Label>

            <Select value={eventId} onValueChange={setEventId}>
              <SelectTrigger>
                <SelectValue placeholder="Select notification event" />
              </SelectTrigger>

              <SelectContent>
                {events?.map((event) => (
                  <SelectItem key={event.id} value={event.id.toString()}>
                    {event.display_name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center justify-between rounded-lg border p-3">
            <div>
              <p className="font-medium">Enabled</p>

              <p className="text-sm text-slate-500">
                Receive notifications immediately.
              </p>
            </div>

            <Switch checked={enabled} onCheckedChange={setEnabled} />
          </div>
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => {
              resetForm();
              onOpenChange(false);
            }}
          >
            Cancel
          </Button>

          <Button 
            onClick={handleSubmit} 
            disabled={isSaving}>
              {isSaving
                ? "Saving..."
                : recipient
                  ? "Save Changes"
                  : "Save Recipient"}
          </Button>

        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
