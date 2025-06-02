"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const mockExposure = {
  id: "1",
  title: "Говорить с незнакомцем",
  steps: [
    {
      id: "step1",
      title: "Поприветствовать кассира в магазине",
      time: 30, // секунд
    },
    {
      id: "step2",
      title: "Попросить прохожего показать дорогу",
      time: 60,
    },
    {
      id: "step3",
      title: "Поговорить с коллегой о погоде",
      time: 90,
    },
  ],
};

export default function ExposureStartPage() {
  const { id } = useParams();
  const router = useRouter();
  const [stepIndex, setStepIndex] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [timeLeft, setTimeLeft] = useState(mockExposure.steps[0].time);

  const currentStep = mockExposure.steps[stepIndex];
  const progress = (completedSteps.length / mockExposure.steps.length) * 100;

  const startTimer = () => {
    setIsRunning(true);
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          finishStep();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const finishStep = () => {
    setIsRunning(false);
    setCompletedSteps((prev) => [...prev, stepIndex]);
    if (stepIndex + 1 < mockExposure.steps.length) {
      setStepIndex(stepIndex + 1);
      setTimeLeft(mockExposure.steps[stepIndex + 1].time);
    }
  };

  const handleBack = () => {
    router.push(`/techniques/exposures/${id}`);
  };

  return (
    <div className="h-screen w-full flex flex-col items-center justify-center px-6 py-10">
      <h1 className="text-2xl font-bold mb-4">{mockExposure.title}</h1>

      <Progress value={progress} className="w-full max-w-md mb-6" />

      <Card className="w-full max-w-md">
        <CardContent className="p-6 space-y-4">
          <h2 className="text-lg font-semibold">Шаг {stepIndex + 1}</h2>
          <p>{currentStep.title}</p>

          <div className="text-5xl font-bold text-center">{timeLeft}s</div>

          {!isRunning ? (
            <Button onClick={startTimer} className="w-full">
              Начать
            </Button>
          ) : (
            <Button disabled className="w-full">
              Выполняется...
            </Button>
          )}
        </CardContent>
      </Card>

      {stepIndex + 1 === mockExposure.steps.length &&
        completedSteps.length === mockExposure.steps.length && (
          <div className="mt-6 space-y-2 text-center">
            <h3 className="text-xl font-bold">Экспозиция завершена!</h3>
            <Button onClick={handleBack}>Вернуться к описанию</Button>
          </div>
        )}
    </div>
  );
}
