'use client';

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Trash2 } from "lucide-react";

interface StepInputProps {
  step: string;
  index: number;
  onUpdate: (value: string) => void;
  onRemove: () => void;
}

export function StepInput({ step, index, onUpdate, onRemove }: StepInputProps) {
  return (
    <div className="flex items-start gap-2">
      <span className="mt-2 text-sm font-medium text-muted-foreground">
        {index + 1}.
      </span>
      <Textarea
        placeholder={`Étape ${index + 1}`}
        value={step}
        onChange={(e) => onUpdate(e.target.value)}
        className="flex-1"
      />
      <Button
        type="button"
        variant="ghost"
        size="icon"
        onClick={onRemove}
        className="mt-1 text-destructive hover:text-destructive/90"
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  );
}