import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

const StatCard = ({
  Icon,
  title,
  value,
  note,
  iconClass,
}: {
  Icon: LucideIcon;
  title: string;
  value: string | number;
  note?: string;
  iconClass?: string;
}) => {
  return (
    <Card className="border border-border bg-card/50 backdrop-blur-sm">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-lg font-medium">{title}</CardTitle>
        <Icon className={cn("size-6 text-muted-foreground", iconClass)} />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground mt-0.5">
          {note || "Registered in system"}
        </p>
      </CardContent>
    </Card>
  );
};

export default StatCard;
