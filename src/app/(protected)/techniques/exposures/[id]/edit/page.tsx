"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Trash2, Plus, GripVertical } from "lucide-react";
import clsx from "clsx";

type ExposureStep = {
  id: string;
  title: string;
  duration?: number;
  hasDuration: boolean;
  completed: boolean;
};

const initialSteps: ExposureStep[] = [
  {
    id: "1",
    title: "Посмотреть на паука",
    duration: 60,
    hasDuration: true,
    completed: false,
  },
  {
    id: "2",
    title: "Потрогать стекло с пауком",
    duration: 120,
    hasDuration: true,
    completed: false,
  },
  {
    id: "3",
    title: "Взять паука в руку",
    duration: undefined,
    hasDuration: false,
    completed: false,
  },
];

export default function EditExposurePage() {
  const [steps, setSteps] = useState<ExposureStep[]>(initialSteps);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);

  const handleDragStart = (
    e: React.DragEvent<HTMLDivElement>,
    index: number
  ) => {
    e.dataTransfer.setData("text/plain", index.toString());
  };

  const handleDrop = (
    e: React.DragEvent<HTMLDivElement>,
    targetIndex: number
  ) => {
    const sourceIndex = parseInt(e.dataTransfer.getData("text/plain"), 10);
    if (sourceIndex === targetIndex) return;

    const updated = [...steps];
    const [moved] = updated.splice(sourceIndex, 1);
    updated.splice(targetIndex, 0, moved);
    setSteps(updated);
    setDragOverIndex(null);
  };

  const handleDragOver = (
    e: React.DragEvent<HTMLDivElement>,
    index: number
  ) => {
    e.preventDefault();
    setDragOverIndex(index);
  };

  const handleDragLeave = () => {
    setDragOverIndex(null);
  };

  const updateStep = (index: number, field: keyof ExposureStep, value: any) => {
    const updated = [...steps];
    updated[index] = { ...updated[index], [field]: value };
    setSteps(updated);
  };

  const addStep = () => {
    setSteps([
      ...steps,
      {
        id: crypto.randomUUID(),
        title: "",
        duration: 60,
        hasDuration: true,
        completed: false,
      },
    ]);
  };

  const removeStep = (index: number) => {
    const updated = [...steps];
    updated.splice(index, 1);
    setSteps(updated);
  };

  return (
    <div className="max-w-3xl mx-auto py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Редактировать экспозицию</h1>
        <Button size="icon" variant="ghost" onClick={addStep}>
          <Plus className="w-5 h-5" />
        </Button>
      </div>

      {steps.map((step, index) => (
        <div
          key={step.id}
          draggable
          onDragStart={(e) => handleDragStart(e, index)}
          onDragOver={(e) => handleDragOver(e, index)}
          onDrop={(e) => handleDrop(e, index)}
          onDragLeave={handleDragLeave}
          className={clsx(
            "p-4 mb-4 bg-muted rounded-md transition-colors",
            dragOverIndex === index && "bg-primary/10 border border-primary"
          )}
        >
          <div className="flex items-center gap-2">
            <div className="cursor-grab text-muted-foreground">
              <GripVertical className="w-4 h-4" />
            </div>
            <Input
              value={step.title}
              onChange={(e) => updateStep(index, "title", e.target.value)}
              placeholder="Описание шага"
            />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => removeStep(index)}
            >
              <Trash2 className="w-4 h-4 text-destructive" />
            </Button>
          </div>

          <div className="flex items-center gap-4 mt-4">
            <Label htmlFor={`toggle-${index}`}>С таймером</Label>
            <Switch
              id={`toggle-${index}`}
              checked={step.hasDuration}
              onCheckedChange={(checked) =>
                updateStep(index, "hasDuration", checked)
              }
            />
            {step.hasDuration && (
              <Input
                type="number"
                min={0}
                value={step.duration ?? ""}
                onChange={(e) =>
                  updateStep(index, "duration", parseInt(e.target.value))
                }
                placeholder="Время в секундах"
                className="w-40"
              />
            )}
          </div>

          {index < steps.length - 1 && <Separator className="mt-4" />}
        </div>
      ))}

      <div className="mt-6">
        <Button>Сохранить изменения</Button>
      </div>
    </div>
  );
}
