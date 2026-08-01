import App_Text from "@/app/_components/app_ui/App_Text";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface StatCardProps {
  icon: LucideIcon;
  iconStyle?: string;
  label: string;
  value: string;
  maxValue?: string;
  subLabel?: string;
}

const StatCard = ({
  icon: Icon,
  iconStyle,
  label,
  value,
  maxValue,
  subLabel,
}: StatCardProps) => {
  return (
    <div className="rounded-xl border bg-white p-4 flex flex-col gap-2">
      <div className="flex items-center gap-3">
        <span
          className={cn(
            "h-6 w-6 rounded-full grid place-items-center",
            iconStyle,
          )}
        >
          <Icon className="h-5 w-5" />
        </span>
        <App_Text type="dashText" text={label} />
      </div>
      <div className="flex items-baseline gap-1">
        <App_Text
          text={value}
          extra={
            maxValue && (
              <span className="text-sm text-gray-400">/ {maxValue}</span>
            )
          }
          type="dashTitle"
        />
      </div>
      {subLabel && <span className="text-xs text-gray-500">{subLabel}</span>}
    </div>
  );
};

export default StatCard;
