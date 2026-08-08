import type { NotificationRecipient } from "@/types/settings";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import { CircleOff, Pencil } from "lucide-react";

import RecipientDialog from "./RecipientDialog";

import { useState } from "react";
import { useNotificationEvents } from "@/hooks/useNotificationEvents";
import { useUpdateNotificationRecipient } from "@/hooks/useUpdateNotificationRecipient";

interface Props {
  recipients: NotificationRecipient[];
}

export default function NotificationRecipientsTable({ recipients }: Props) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const { data: events = [] } = useNotificationEvents();
  const updateRecipient = useUpdateNotificationRecipient();

  const [selectedRecipient, setSelectedRecipient] =
      useState<NotificationRecipient | undefined>();

  const recipientsByEvent = new Map<number, NotificationRecipient[]>();

  recipients.forEach((recipient) => {
    const recipientsForEvent = recipientsByEvent.get(recipient.notification_event_id) ?? [];
    recipientsForEvent.push(recipient);
    recipientsByEvent.set(recipient.notification_event_id, recipientsForEvent);
  });

  const eventGroups = events.map((event) => ({
    id: event.id,
    name: event.display_name,
    recipients: recipientsByEvent.get(event.id) ?? [],
  }));

  recipientsByEvent.forEach((eventRecipients, eventId) => {
    if (!events.some((event) => event.id === eventId)) {
      eventGroups.push({
        id: eventId,
        name: eventRecipients[0].event_name,
        recipients: eventRecipients,
      });
    }
  });

  return (
    <>
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Notification Recipients</CardTitle>

        <Button
            onClick={() => {
              setSelectedRecipient(undefined);
              setDialogOpen(true);
            }}
            >
                Add Recipient
        </Button>
      </CardHeader>

      <CardContent>
        <Accordion type="multiple" className="rounded-lg border px-4">
          {eventGroups.map((event) => (
            <AccordionItem key={event.id} value={event.id.toString()}>
              <AccordionTrigger className="py-4 hover:no-underline">
                <span className="flex items-center gap-3">
                  <span>{event.name}</span>
                  <span className="text-xs font-normal text-slate-500">
                    {event.recipients.length} {event.recipients.length === 1 ? "recipient" : "recipients"}
                  </span>
                </span>
              </AccordionTrigger>

              <AccordionContent>
                {event.recipients.length === 0 ? (
                  <p className="pb-3 text-slate-500">
                    No recipients have been added for this event.
                  </p>
                ) : (
                  <div className="space-y-3 pb-3">
                    {event.recipients.map((recipient) => (
                      <div
                        key={recipient.id}
                        className="flex flex-col gap-3 rounded-lg border p-4 sm:flex-row sm:items-center sm:justify-between"
                      >
                        <div className="min-w-0">
                          <p className="font-medium">{recipient.display_name}</p>
                          <a
                            href={`mailto:${recipient.email}`}
                            className="text-sm text-slate-600 hover:underline"
                          >
                            {recipient.email}
                          </a>
                        </div>

                        <div className="flex items-center gap-3">
                          <Badge variant={recipient.enabled ? "default" : "secondary"}>
                            {recipient.enabled ? "Enabled" : "Disabled"}
                          </Badge>

                          <Button
                            variant="outline"
                            size="sm"
                            disabled={updateRecipient.isPending}
                            onClick={() => {
                              setSelectedRecipient(recipient);
                              setDialogOpen(true);
                            }}
                          >
                            <Pencil className="mr-2 h-4 w-4" />
                            Edit
                          </Button>

                          {recipient.enabled && (
                            <Button
                              variant="destructive"
                              size="sm"
                              disabled={updateRecipient.isPending}
                              onClick={() =>
                                updateRecipient.mutate({
                                  id: recipient.id,
                                  request: {
                                    notification_event_id: recipient.notification_event_id,
                                    display_name: recipient.display_name,
                                    email: recipient.email,
                                    enabled: false,
                                  },
                                })
                              }
                            >
                              <CircleOff className="mr-2 h-4 w-4" />
                              Deactivate
                            </Button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </CardContent>
    </Card>

    <RecipientDialog
        open={dialogOpen}
        onOpenChange={(open) => {
          setDialogOpen(open);

          if(!open) {
            setSelectedRecipient(undefined);
          }
        }}
        recipient={selectedRecipient}
    />

    </>
    
  );
}
