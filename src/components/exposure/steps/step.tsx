import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  ChevronDown,
  ChevronUp,
  Play,
  Pause,
  RotateCcw,
  CheckCircle,
  Circle,
} from "lucide-react";
import clsx from "clsx";

interface StepProps {
  id: number;
  title: string;
  description: string;
  status: "Completed" | "Pending";
  disabled: boolean;
  onChange: (updatedStep: any) => void;
  isActive: boolean;
  duration?: number; // in seconds
}

export default function Step({
  id,
  title,
  description,
  duration = 0,
  status,
  disabled,
  onChange,
  isActive,
}: StepProps) {
  const [expanded, setExpanded] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [wasStarted, setWasStarted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(duration);

  // Обработка окончания таймера
  useEffect(() => {
    if (!isRunning || duration <= 0) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setIsRunning(false);
          onChange({ id, type: "ActionStep", status: "Completed" });
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning, duration, id, onChange]);

  const handleStatusToggle = () => {
    if (disabled) return;
    const newStatus = status === "Completed" ? "Pending" : "Completed";
    onChange({ id, type: "ActionStep", status: newStatus });
  };

  const percentComplete =
    duration > 0 ? ((duration - timeLeft) / duration) * 100 : 0;

  const borderColor = isActive
    ? "border-yellow-400"
    : status === "Completed"
    ? "border-green-500"
    : "border-gray-300";

  const formattedTime = `${Math.floor(timeLeft / 60)}:${(
    "0" +
    (timeLeft % 60)
  ).slice(-2)}`;

  return (
    <Card
      className={clsx(
        "relative overflow-hidden transition-all border-2 rounded-2xl shadow-sm",
        borderColor
      )}
    >
      <div
        className="absolute top-0 left-0 h-full bg-yellow-100 z-0"
        style={{ width: `${percentComplete}%`, transition: "width 1s" }}
      />
      <CardContent className="relative z-10">
        <div className="flex items-center gap-4">
          <button onClick={handleStatusToggle} disabled={disabled}>
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

          <div className="flex-1 space-y-2">
            <div className="flex items-center gap-2">
              <h4 className="text-lg font-medium text-gray-900 flex-1">
                {title}
              </h4>

              {duration > 0 && (
                <div className="flex items-center gap-1">
                  <Input
                    className="w-20 text-center text-sm px-2 py-1"
                    readOnly
                    value={formattedTime}
                  />
                  {wasStarted && (
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => {
                        setTimeLeft(duration);
                        setIsRunning(false);
                      }}
                    >
                      <RotateCcw className="w-5 h-5" />
                    </Button>
                  )}
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => {
                      setIsRunning((prev) => !prev);
                      setWasStarted(true);
                    }}
                  >
                    {isRunning ? (
                      <Pause className="w-5 h-5" />
                    ) : (
                      <Play className="w-5 h-5" />
                    )}
                  </Button>
                </div>
              )}

              <Button
                variant="ghost"
                size="icon"
                onClick={() => setExpanded((prev) => !prev)}
              >
                {expanded ? (
                  <ChevronUp className="w-5 h-5" />
                ) : (
                  <ChevronDown className="w-5 h-5" />
                )}
              </Button>
            </div>

            {expanded && <p className="text-sm text-gray-600">{description}</p>}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
