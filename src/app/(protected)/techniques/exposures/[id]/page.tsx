"use client";

import { useEffect, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Footprints, Captions, Calendar } from "lucide-react";

type Step = {
  id: number;
  title: string;
  duration: number; // in seconds
};

const mockSteps: Step[] = [
  { id: 1, title: "Поприветствовать кассира в магазине", duration: 60 },
  { id: 2, title: "Попросить прохожего показать дорогу", duration: 90 },
  { id: 3, title: "Поговорить с коллегой с погоде", duration: 45 },
];

export default function ExposureExecutionPage() {
  const [activeStepId, setActiveStepId] = useState<number | null>(null);
  const [timers, setTimers] = useState<Record<number, number>>(
    Object.fromEntries(mockSteps.map((step) => [step.id, step.duration]))
  );
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  useEffect(() => {
    if (activeStepId === null) return;

    const interval = setInterval(() => {
      setTimers((prev) => {
        const current = prev[activeStepId];
        if (current <= 1) {
          clearInterval(interval);
          setCompletedSteps((prev) => [...prev, activeStepId]);
          setActiveStepId(null);
          return { ...prev, [activeStepId]: 0 };
        }
        return { ...prev, [activeStepId]: current - 1 };
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [activeStepId]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  const stepItem = (step) => {
    const timeLeft = timers[step.id];
    const isActive = activeStepId === step.id;
    const isCompleted = completedSteps.includes(step.id);
    const progress = 1 - timeLeft / step.duration;

    const baseBg = isCompleted
      ? "bg-green-100"
      : isActive
      ? "bg-blue-100"
      : "bg-white";

    return (
      <AccordionItem key={step.id} value={`step-${step.id}`}>
        <div
          className={`rounded-md p-4 transition-colors duration-300 relative overflow-hidden ${baseBg}`}
          style={{
            backgroundImage: isActive
              ? `linear-gradient(to right, rgba(59,130,246,0.2) ${
                  progress * 100
                }%, transparent ${progress * 100}%)`
              : undefined,
          }}
        >
          <AccordionTrigger className="text-base font-medium">
            {step.title}
          </AccordionTrigger>
          <AccordionContent className="pt-3">
            <div className="flex items-center justify-between">
              <div className="text-sm font-mono">{formatTime(timeLeft)}</div>
              {isCompleted && (
                <span className="text-green-600 text-sm">Завершено</span>
              )}
              {!isCompleted && !isActive && (
                <Button size="sm" onClick={() => setActiveStepId(step.id)}>
                  Начать
                </Button>
              )}
            </div>
          </AccordionContent>
        </div>
        <Separator />
      </AccordionItem>
    );
  };

  return (
    <div className="max-w-screen-sm mx-auto py-12 md:py-20 px-6">
      <h1 className="text-2xl font-bold mb-4">Разговор с незнакомцем</h1>
      <div className="relative ml-3">
        {/* Timeline line */}
        <div className="absolute left-0 inset-y-0 border-l-2" />

        {mockSteps.map(({ id, title, duration }, index) => (
          <div key={id} className="relative pl-10 pb-12 last:pb-0">
            {/* Timeline Icon */}
            <div className="absolute left-px -translate-x-1/2 h-9 w-9 flex items-center justify-center rounded-full bg-background">
              <Footprints className="h-5 w-5" />
            </div>

            {/* Content */}
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="flex-shrink-0 h-9 w-9 bg-accent rounded-full flex items-center justify-center">
                  <Captions className="h-5 w-5 text-muted-foreground" />
                </div>
                <span className="text-base sm:text-lg font-semibold">
                  {title}
                </span>
              </div>
              {/* <div>
                <h3 className="text-lg sm:text-xl font-medium">{title}</h3>
                <div className="flex items-center gap-2 mt-1 text-sm">
                  <Calendar className="h-4 w-4" />
                  <span>{period}</span>
                </div>
              </div> */}
              {/* <p className="text-sm sm:text-base text-muted-foreground">
                {description}
              </p> */}
              <div className="flex flex-wrap gap-2">
                {/* {technologies.map((tech) => (
                  <Badge
                    key={tech}
                    variant="secondary"
                    className="rounded-full"
                  >
                    {tech}
                  </Badge>
                ))} */}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
