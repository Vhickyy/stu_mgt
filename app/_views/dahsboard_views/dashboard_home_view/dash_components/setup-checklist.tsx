import Link from "next/link";
import { CheckCircle2, Circle, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import App_Button from "@/app/_components/app_ui/App_Button";
import App_Text from "@/app/_components/app_ui/App_Text";
import { SetupStatus } from "../dash_data/dash_data";

const SetupChecklist = ({ status }: { status: SetupStatus }) => {
  const completedCount = status.steps.filter((s) => s.completed).length;

  return (
    <div className="rounded-xl border bg-white p-5">
      <div className="flex items-center justify-between mb-1">
        <App_Text type="cardhead" text="Finish setting up StudentHub" />
        <span className="text-sm text-gray-500">
          {completedCount}/{status.steps.length} done
        </span>
      </div>
      <p className="text-sm text-gray-500 mb-4">
        A few quick steps and your dashboard will show your real GPA, courses
        and progress.
      </p>

      <div className="space-y-2">
        {status.steps.map((step, i) => (
          <Link
            key={step.key}
            href={step.href}
            className={cn(
              "flex items-center justify-between rounded-lg border p-3 transition-colors",
              step.completed
                ? "bg-gray-50"
                : "hover:bg-primary/5 hover:border-primary",
              !step.completed &&
                status.nextStep?.key === step.key &&
                "border-primary bg-primary/5",
            )}
          >
            <div className="flex items-center gap-3">
              {step.completed ? (
                <CheckCircle2 className="h-5 w-5 text-green-600 shrink-0" />
              ) : (
                <Circle className="h-5 w-5 text-gray-300 shrink-0" />
              )}
              <div>
                <p
                  className={cn(
                    "text-sm font-medium",
                    step.completed && "text-gray-400 line-through",
                  )}
                >
                  {i + 1}. {step.label}
                </p>
                {!step.completed && (
                  <p className="text-xs text-gray-500">{step.description}</p>
                )}
              </div>
            </div>
            {!step.completed && (
              <ArrowRight className="h-4 w-4 text-gray-400 shrink-0" />
            )}
          </Link>
        ))}
      </div>

      {status.nextStep && (
        <Link href={status.nextStep.href} className="block mt-4">
          <App_Button
            text={`Continue: ${status.nextStep.label}`}
            btnStyle="bg-primary text-white w-full"
          />
        </Link>
      )}
    </div>
  );
};

export default SetupChecklist;
