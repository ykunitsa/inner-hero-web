import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle, Circle } from "lucide-react";
import * as Slider from "@radix-ui/react-slider";
import clsx from "clsx";

interface RatingStepProps {
  id: number;
  value: number;
  notes: string;
  status: "Pending" | "Completed";
  disabled: boolean;
  type: "SubjectiveRatingStep" | "ObjectiveRatingStep";
  isActive: boolean;
  onChange: (updatedStep: any) => void;
}

const anxietyLevels = [
  {
    emoji: "😊",
    label: "No anxiety",
    bg: "bg-green-400",
    color: "text-green-400",
  },
  {
    emoji: "🙂",
    label: "Minimal",
    bg: "bg-green-300",
    color: "text-green-300",
  },
  { emoji: "😐", label: "Mild", bg: "bg-yellow-300", color: "text-yellow-300" },
  {
    emoji: "😕",
    label: "Moderate",
    bg: "bg-yellow-400",
    color: "text-yellow-400",
  },
  {
    emoji: "😟",
    label: "Uncomfortable",
    bg: "bg-orange-300",
    color: "text-orange-300",
  },
  { emoji: "😨", label: "High", bg: "bg-orange-500", color: "text-orange-500" },
  { emoji: "😰", label: "Very High", bg: "bg-red-300", color: "text-red-300" },
  { emoji: "😢", label: "Severe", bg: "bg-red-400", color: "text-red-400" },
  { emoji: "😭", label: "Extreme", bg: "bg-red-500", color: "text-red-500" },
  {
    emoji: "🤯",
    label: "Panic",
    bg: "bg-purple-500",
    color: "text-purple-500",
  },
  {
    emoji: "💀",
    label: "Overwhelming",
    bg: "bg-purple-700",
    color: "text-purple-700",
  },
];

export default function RatingStep({
  id,
  value,
  notes,
  status,
  disabled,
  type,
  isActive,
  onChange,
}: RatingStepProps) {
  const [localValue, setLocalValue] = useState(value);
  const [localNotes, setLocalNotes] = useState(notes);

  const title =
    type === "SubjectiveRatingStep"
      ? "Subjective assessment of anxiety"
      : "Realistic assessment of anxiety";

  const currentLevel = anxietyLevels[localValue];

  const borderColor = clsx({
    "border-yellow-400": isActive,
    "border-green-500": !isActive && status === "Completed",
    "border-gray-300": !isActive && status === "Pending",
  });

  const toggleStatus = () => {
    if (disabled) return;
    const newStatus = status === "Pending" ? "Completed" : "Pending";
    onChange({
      id,
      type,
      status: newStatus,
      value: localValue,
      notes: localNotes,
    });
  };

  return (
    <Card
      className={clsx(
        "relative transition-all border-2 rounded-2xl shadow-sm",
        borderColor
      )}
    >
      <CardContent className="flex flex-col gap-4">
        <div className="flex items-center gap-4">
          <button onClick={toggleStatus} disabled={disabled}>
            {status === "Completed" ? (
              <CheckCircle className="w-6 h-6 text-green-500" />
            ) : (
              <Circle
                className={clsx(
                  "w-6 h-6",
                  isActive ? "text-yellow-500" : "text-gray-400"
                )}
              />
            )}
          </button>
          <h4 className="text-lg font-medium text-gray-900 flex-1">{title}</h4>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-700">
            Anxiety level:{" "}
            <span className={clsx("font-bold", currentLevel.color)}>
              {currentLevel.label}
            </span>
          </label>
          <div className="w-full flex flex-col items-center">
            <Slider.Root
              value={[localValue]}
              min={0}
              max={10}
              step={1}
              onValueChange={([val]) => setLocalValue(val)}
              className="relative flex w-full touch-none select-none items-center"
            >
              <Slider.Track className="relative h-1.5 w-full grow overflow-hidden rounded-full bg-primary/20">
                <Slider.Range
                  className={clsx("absolute h-full", currentLevel.bg)}
                />
              </Slider.Track>
              <Slider.Thumb className="h-6 w-6 flex items-center justify-center rounded-full border border-primary/50 bg-background shadow transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50">
                <span>{currentLevel.emoji}</span>
              </Slider.Thumb>
            </Slider.Root>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-700">Notes:</label>
          <Textarea
            value={localNotes}
            onChange={(e) => setLocalNotes(e.target.value)}
            placeholder="Your observations, thoughts and feelings..."
          />
        </div>
      </CardContent>
    </Card>
  );
}
