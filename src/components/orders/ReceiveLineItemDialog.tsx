import { useState } from "react";
import { toast } from "sonner";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { useReceiveLineItem } from "@/hooks/useReceiveLineItems";
import { getApiErrorMessage } from "@/lib/apiError";

import type { WsoLineItem } from "@/types/lineItem";

interface ReceiveLineItemDialogProps {
  item: WsoLineItem;
  trigger: React.ReactNode;
}

export default function ReceiveLineItemDialog({
  item,
  trigger,
}: ReceiveLineItemDialogProps) {
  const [open, setOpen] = useState(false);

  const [quantity, setQuantity] = useState(0);

  const receiveMutation = useReceiveLineItem();

  function handleReceive() {
    receiveMutation.mutate(
      {
        id: item.id,
        payload: {
          quantity,
        },
      },
      {
        onSuccess: () => {
          toast.success("Stock received successfully.");
          setOpen(false);
        },

        onError: (error) => {
          toast.error(getApiErrorMessage(error));
        },
      },
    );
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Receive Stock</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-y-3 text-sm">
            <span className="font-medium">Size</span>

            <span>{item.size}</span>

            <span className="font-medium">Quantity Raised</span>

            <span>{item.qty_raised}</span>

            <span className="ont-medium">Already Received</span>

            <span>{item.qty_received}</span>

            <span className="font-medium">Remaining Balance</span>

            <span>{item.balance}</span>
          </div>

          <div className="space-y-2">
            <Label>Quantity Received</Label>

            <Input
              type="number"
              min={1}
              max={item.balance}
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
            />
          </div>

          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>

            <Button
              onClick={handleReceive}
              disabled={quantity <= 0 || quantity > item.balance}
            >
              Receive Stock
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
