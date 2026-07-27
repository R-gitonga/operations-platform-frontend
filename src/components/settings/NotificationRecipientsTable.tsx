import type { NotificationRecipient } from "@/types/settings";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import { Pencil } from "lucide-react";

import RecipientDialog from "./RecipientDialog";

import { useState } from "react";

interface Props {
  recipients: NotificationRecipient[];
}

export default function NotificationRecipientsTable({ recipients }: Props) {
  const [dialogOpen, setDialogOpen] = useState(false);
  
  const [selectedRecipient, setSelectedRecipient] =
      useState<NotificationRecipient | undefined>();
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
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Event</TableHead>
              <TableHead>Recipient</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-28">Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {recipients.map((recipient) => (
              <TableRow key={recipient.id}>
                <TableCell className="font-medium">
                  {recipient.event_name}
                </TableCell>

                <TableCell>{recipient.display_name}</TableCell>

                <TableCell className="text-slate-600">
                  {recipient.email}
                </TableCell>

                <TableCell>
                  <Badge variant={recipient.enabled ? "default" : "secondary"}>
                    {recipient.enabled ? "Enabled" : "Disabled"}
                  </Badge>
                </TableCell>

                <TableCell>
                  <Button 
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setSelectedRecipient(recipient);
                      setDialogOpen(true);
                    }}
                  >
                    <Pencil className="mr-2 h-4 w-4" />
                    Edit
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
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
