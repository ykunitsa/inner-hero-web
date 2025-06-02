// Страница выполнения экспозиции с шагами, таймерами и прогрессом
"use client";

import * as React from "react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Checkbox } from "@/components/ui/checkbox";
import { CheckCircle2, Clock, Pause, Play } from "lucide-react";
import { cn } from "@/lib/utils";
import { TodoCard } from "@/components/todo-card";

const TodoList = () => {
  const [tasks, setTasks] = useState([
    {
      id: "1",
      title: "Закончить проект",
      description: "Доделать анимации",
      status: "active",
      duration: 10, // 3 минуты
    },
    {
      id: "2",
      title: "Позвонить клиенту",
      status: "pending",
    },
  ]);

  const toggleStatus = (id: string) => {
    setTasks(
      tasks.map((task) =>
        task.id === id
          ? {
              ...task,
              status: task.status === "completed" ? "pending" : "completed",
            }
          : task
      )
    );
  };

  const handleEdit = (
    id: string,
    newData: { title: string; description: string }
  ) => {
    setTasks(
      tasks.map((task) => (task.id === id ? { ...task, ...newData } : task))
    );
  };

  return (
    <div className="space-y-3 p-4 max-w-md mx-auto">
      {tasks.map((task) => (
        <TodoCard
          key={task.id}
          id={task.id}
          title={task.title}
          description={task.description}
          initialStatus={task.status as TaskStatus}
          totalDuration={task.duration || 300} // Дефолт: 5 минут
          onToggleStatus={toggleStatus}
          onEdit={handleEdit}
        />
      ))}
    </div>
  );
};

function StepComponent({
  title,
  completed,
  onToggle,
}: {
  title: string;
  completed: boolean;
  onToggle: () => void;
}) {
  return (
    <div
      className={cn(
        "flex items-center justify-between border p-4 rounded-xl shadow-sm transition-all",
        completed ? "bg-green-100 border-green-300" : "bg-white border-gray-200"
      )}
    >
      <div className="flex items-center gap-2">
        {completed ? (
          <CheckCircle2 className="text-green-500" />
        ) : (
          <Clock className="text-muted-foreground" />
        )}
        <span>{title}</span>
      </div>
      <Checkbox checked={completed} onCheckedChange={onToggle} />
    </div>
  );
}

function TimerStep({
  duration,
  title,
  completed,
  onToggle,
}: {
  duration: number;
  title: string;
  completed: boolean;
  onToggle: () => void;
}) {
  const [timeLeft, setTimeLeft] = useState(duration);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    if (!running || timeLeft <= 0) return;
    const timer = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          onToggle();
          setRunning(false);
          clearInterval(timer);
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [running, timeLeft]);

  const percent = Math.round(((duration - timeLeft) / duration) * 100);

  const handleStart = () => setRunning(true);
  const handlePause = () => setRunning(false);
  const handleComplete = () => {
    onToggle();
    setRunning(false);
    setTimeLeft(0);
  };

  return (
    <Card
      className={cn(
        "w-full transition-all",
        completed ? "bg-green-100 border-green-300" : "bg-white border-gray-200"
      )}
    >
      <CardContent className="flex flex-col gap-4 items-center">
        <div
          className={cn(
            "w-full transition-all",
            completed
              ? "bg-green-100 border-green-300"
              : "bg-white border-gray-200"
          )}
        >
          <div className="flex items-center gap-2">
            {completed ? (
              <CheckCircle2 className="text-green-500" />
            ) : (
              <Clock className="text-muted-foreground" />
            )}
            <span>{title}</span>
          </div>
        </div>
        <div className="relative w-32 h-32">
          <svg className="w-full h-full rotate-[-90deg]">
            <circle
              cx="50%"
              cy="50%"
              r="48"
              stroke="#e5e7eb"
              strokeWidth="8"
              fill="none"
            />
            <circle
              cx="50%"
              cy="50%"
              r="48"
              stroke={completed ? "#22c55e" : "#3b82f6"}
              strokeWidth="8"
              fill="none"
              strokeDasharray={2 * Math.PI * 48}
              strokeDashoffset={(1 - percent / 100) * 2 * Math.PI * 48}
              style={{ transition: "stroke-dashoffset 0.5s ease" }}
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center text-2xl font-mono">
            {timeLeft} сек
          </div>
        </div>

        <div className="flex justify-center gap-2">
          {!completed && (
            <>
              <Button onClick={handleStart} disabled={running}>
                <Play className="w-4 h-4 mr-1" /> Старт
              </Button>
              <Button
                onClick={handlePause}
                disabled={!running}
                variant="outline"
              >
                <Pause className="w-4 h-4 mr-1" /> Пауза
              </Button>
            </>
          )}
          {completed && (
            <Button disabled variant="success">
              Завершено
            </Button>
          )}
          {!completed && timeLeft <= 3 && timeLeft > 0 && (
            <Button variant="destructive" onClick={handleComplete}>
              Завершить досрочно
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

export default function ExposurePage() {
  const [step1Done, setStep1Done] = useState(false);
  const [step2Done, setStep2Done] = useState(false);
  const [step3Done, setStep3Done] = useState(false);

  const progressValue =
    ((Number(step1Done) + Number(step2Done) + Number(step3Done)) / 3) * 100;

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6  min-h-screen">
      <Card>
        <CardHeader>
          <CardTitle>Выполнение экспозиции</CardTitle>
        </CardHeader>
        <CardContent>
          <Progress value={progressValue} />
        </CardContent>
      </Card>

      <StepComponent
        title="Шаг 1: Пройти мимо охранника без взгляда в пол"
        completed={step1Done}
        onToggle={() => setStep1Done(!step1Done)}
      />

      <TimerStep
        title="Шаг 2: Остаться в общественном месте"
        duration={10}
        completed={step2Done}
        onToggle={() => setStep2Done(!step2Done)}
      />

      <StepComponent
        title="Шаг 3: Задать вопрос незнакомцу"
        completed={step3Done}
        onToggle={() => setStep3Done(!step3Done)}
      />

      <TodoList />
    </div>
  );
}
