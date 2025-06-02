import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Plus, Trash } from "lucide-react";

interface NewExposureProps {
  onSave: (exposure: any) => void;
  initial?: any;
}

export default function ExposureEditor({ onSave, initial }: NewExposureProps) {
  const [title, setTitle] = useState(initial?.title || "");
  const [steps, setSteps] = useState(
    initial?.steps || [
      {
        id: 1,
        type: "SubjectiveRatingStep",
        status: "Pending",
        value: 0,
        notes: "",
      },
      {
        id: 2,
        type: "ObjectiveRatingStep",
        status: "Pending",
        value: 0,
        notes: "",
      },
    ]
  );

  const addActionStep = () => {
    const newId = steps.length + 1;
    const newStep = {
      id: newId,
      type: "ActionStep",
      title: "",
      description: "",
      duration: 60,
      status: "Pending",
    };
    const updatedSteps = [...steps];
    updatedSteps.splice(steps.length - 1, 0, newStep); // вставляем перед последним шагом
    setSteps(updatedSteps);
  };

  const updateStep = (index: number, key: string, value: any) => {
    const updated = [...steps];
    updated[index] = { ...updated[index], [key]: value };
    setSteps(updated);
  };

  const removeActionStep = (index: number) => {
    const updated = steps.filter((_, i) => i !== index);
    setSteps(updated);
  };

  const handleSave = () => {
    onSave({ title, steps });
  };

  return (
    <div className="flex flex-col gap-6 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-900">
        {initial ? "Edit Exposure" : "Create Exposure"}
      </h2>

      <div>
        <label className="text-sm font-medium text-gray-700">Title:</label>
        <Input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter exposure title"
        />
      </div>

      {steps.map((step, index) => {
        if (
          step.type === "SubjectiveRatingStep" ||
          step.type === "ObjectiveRatingStep"
        ) {
          return (
            <Card key={step.id} className="border-2 border-gray-300">
              <CardContent className="space-y-4">
                <h4 className="font-semibold">
                  {step.type === "SubjectiveRatingStep"
                    ? "Subjective anxiety rating"
                    : "Objective anxiety rating"}
                </h4>
              </CardContent>
            </Card>
          );
        }

        if (step.type === "ActionStep") {
          return (
            <Card key={step.id} className="border-2 border-yellow-300">
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <h4 className="font-semibold">Action Step</h4>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeActionStep(index)}
                  >
                    <Trash className="w-5 h-5 text-red-500" />
                  </Button>
                </div>
                <div>
                  <label className="text-sm">Title:</label>
                  <Input
                    value={step.title}
                    onChange={(e) => updateStep(index, "title", e.target.value)}
                  />
                </div>
                <div>
                  <label className="text-sm">Description:</label>
                  <Textarea
                    value={step.description}
                    onChange={(e) =>
                      updateStep(index, "description", e.target.value)
                    }
                    placeholder="Describe the action step"
                  />
                </div>
                <div>
                  <label className="text-sm">Duration (seconds):</label>
                  <Input
                    type="number"
                    value={step.duration}
                    onChange={(e) =>
                      updateStep(index, "duration", Number(e.target.value))
                    }
                  />
                </div>
              </CardContent>
            </Card>
          );
        }

        return null;
      })}

      <Button variant="outline" onClick={addActionStep}>
        <Plus className="w-4 h-4 mr-2" /> Add Action Step
      </Button>

      <Button className="self-end" onClick={handleSave}>
        Save Exposure
      </Button>
    </div>
  );
}
