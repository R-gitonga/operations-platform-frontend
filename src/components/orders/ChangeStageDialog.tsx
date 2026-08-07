import { useEffect, useState } from "react";
import { toast } from "sonner";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";

import { Label } from "@/components/ui/label";

import { Textarea } from "@/components/ui/textarea";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useProductionStages } from "@/hooks/useProductionStages";
import { useChangeProductionItemStage } from "@/hooks/useChangeProductionItemStage";
import { getApiErrorMessage } from "@/lib/apiError";

interface Props {
  open: boolean;

  onOpenChange: (open: boolean) => void;

  wsoId: number;

  wsoItemId: number;

  currentStageId: number | null;
}

export default function ChangeStageDialog({
  open,

  onOpenChange,

  wsoId,

  wsoItemId,

  currentStageId,
}: Props) {
  const { data: stages = [] } = useProductionStages();

  const mutation = useChangeProductionItemStage(wsoId, wsoItemId);

  const [stageId, setStageId] = useState("");

  const [notes, setNotes] = useState("");

  useEffect(() => {
    if (open) {
      setStageId(currentStageId ? currentStageId.toString() : "");

      setNotes("");
    }
  }, [open, currentStageId]);

  function submit() {
    if (!stageId) {
      toast.error("Please select a production stage.");
      return;
    }

    mutation.mutate(
      {
        production_stage_id: Number(stageId),
        notes,
        changed_by: "Rodney Gitonga",
      },
      {
        onSuccess: () => {
          toast.success("Production stage updated successfully.");
          onOpenChange(false);
        },
        onError: (error) => {
          toast.error(getApiErrorMessage(error));
        },
      },
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Change Production Stage</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <Label>Stage</Label>

            <Select value={stageId} onValueChange={setStageId}>
              <SelectTrigger>
                <SelectValue placeholder="Select stage" />
              </SelectTrigger>

              <SelectContent>
                {stages.map((stage) => (
                  <SelectItem key={stage.id} value={stage.id.toString()}>
                    {stage.display_name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Notes</Label>

            <Textarea
              rows={4}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Optional notes..."
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>

          <Button onClick={submit} disabled={mutation.isPending}>
            Update Stage
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
