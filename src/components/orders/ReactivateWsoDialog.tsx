import { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";

import { useReactivateWso } from "@/hooks/useReactivateWso";

import type { ReactNode } from "react";

interface Props {
  id: number;
  trigger: ReactNode;
}

export default function ReactivateWsoDialog({ id, trigger }: Props) {
  const [open, setOpen] = useState(false);

  const mutation = useReactivateWso();

  function handleReactivate() {
    mutation.mutate(
      { wsoId: id },
      {
        onSuccess: () => {
          setOpen(false);
        },
      },
    );
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Reactivate Workshop Order</DialogTitle>

          <DialogDescription>
            This will reactivate the Workshop Order and allow production and
            receiving to continue.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Close
          </Button>

          <Button onClick={handleReactivate} disabled={mutation.isPending}>
            {mutation.isPending ? "Reactivating..." : "Reactivate"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
