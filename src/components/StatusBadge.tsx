import { Badge } from "@/components/ui/badge";
import { Clock, CheckCircle, AlertCircle, ArrowUp } from "lucide-react";

type Status = "submitted" | "assigned" | "in-progress" | "escalated" | "resolved";

interface StatusBadgeProps {
  status: Status;
}

const statusConfig = {
  submitted: {
    label: "Submitted",
    variant: "secondary" as const,
    icon: Clock,
  },
  assigned: {
    label: "Assigned",
    variant: "secondary" as const,
    icon: Clock,
  },
  "in-progress": {
    label: "In Progress",
    variant: "default" as const,
    icon: Clock,
  },
  escalated: {
    label: "Escalated",
    variant: "destructive" as const,
    icon: ArrowUp,
  },
  resolved: {
    label: "Resolved",
    variant: "outline" as const,
    icon: CheckCircle,
  },
};

export const StatusBadge = ({ status }: StatusBadgeProps) => {
  const config = statusConfig[status];
  const Icon = config.icon;

  return (
    <Badge 
      variant={config.variant}
      className={`flex items-center gap-1 ${
        status === "resolved" ? "bg-success text-success-foreground hover:bg-success/90" : ""
      } ${
        status === "in-progress" ? "bg-primary text-primary-foreground" : ""
      }`}
    >
      <Icon className="h-3 w-3" />
      {config.label}
    </Badge>
  );
};
