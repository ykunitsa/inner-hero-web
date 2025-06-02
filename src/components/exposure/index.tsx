import { useState } from "react";
import Step from "./steps/step";
import RatingStep from "./steps/rating-step";
import { Badge } from "@/components/ui/badge"; // используем компонент бейджа

export interface StepBase {
  id: number;
  type: "SubjectiveRatingStep" | "ObjectiveRatingStep" | "ActionStep";
  status: "Pending" | "Completed";
}

interface SubjectiveRatingStep extends StepBase {
  type: "SubjectiveRatingStep";
  value: number;
  notes: string;
}

interface ObjectiveRatingStep extends StepBase {
  type: "ObjectiveRatingStep";
  value: number;
  notes: string;
}

interface ActionStep extends StepBase {
  type: "ActionStep";
  title: string;
  description: string;
  duration: number;
}

export type StepType = SubjectiveRatingStep | ObjectiveRatingStep | ActionStep;

export interface ExposureProps {
  id: number;
  title: string;
  status: "To Do" | "In Progress" | "Done";
  steps: StepType[];
  onStatusChange?: (status: "To Do" | "In Progress" | "Done") => void;
  onStepsChange?: (steps: StepType[]) => void;
}

export default function Exposure({
  title,
  status,
  steps,
  onStatusChange,
  onStepsChange,
}: ExposureProps) {
  const [stepStates, setStepStates] = useState(steps);

  const updateStep = (updatedStep: StepType) => {
    const newSteps = stepStates.map((step) =>
      step.id === updatedStep.id ? { ...step, ...updatedStep } : step
    );

    setStepStates(newSteps);
    onStepsChange?.(newSteps);

    const allCompleted = newSteps.every((s) => s.status === "Completed");
    const anyCompleted = newSteps.some((s) => s.status === "Completed");

    const newStatus: ExposureProps["status"] = allCompleted
      ? "Done"
      : anyCompleted
      ? "In Progress"
      : "To Do";

    if (newStatus !== status) {
      onStatusChange?.(newStatus);
    }
  };

  const activeStepIndex = stepStates.findIndex(
    (step) => step.status === "Pending"
  );

  const isStepDisabled = (index: number) =>
    index > 0 && stepStates[index - 1].status !== "Completed";

  const renderStatusBadge = () => {
    const statusMap = {
      "To Do": "bg-gray-200 text-gray-800",
      "In Progress": "bg-yellow-100 text-yellow-800",
      Done: "bg-green-100 text-green-800",
    };

    return (
      <Badge className={`text-sm px-2 py-1 rounded ${statusMap[status]}`}>
        {status}
      </Badge>
    );
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold text-gray-900">{title}</h3>
        {renderStatusBadge()}
      </div>

      {stepStates.map((step, index) => {
        const commonProps = {
          id: step.id,
          status: step.status,
          disabled: isStepDisabled(index),
          isActive: index === activeStepIndex,
          onChange: updateStep,
        };

        if (step.type === "ActionStep") {
          return (
            <Step
              {...commonProps}
              key={step.id}
              title={step.title}
              description={step.description}
              duration={step.duration}
            />
          );
        }

        return (
          <RatingStep
            {...commonProps}
            key={step.id}
            type={step.type}
            value={step.value}
            notes={step.notes}
          />
        );
      })}
    </div>
  );
}
