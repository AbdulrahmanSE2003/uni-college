import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

export interface StatCardProps {
  Icon: LucideIcon;
  title: string;
  iconClass?: string;
  value: string | number;
  note?: string;
}

const StatsCard = ({ Icon, iconClass, value, note, title }: StatCardProps) => {
  return (
    <Card className="border border-border bg-card/50 backdrop-blur-sm hover:border-primary/75 transition-colors duration-300 group">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-lg font-medium">{title}</CardTitle>
        <Icon className={cn("size-6 stroke-muted-foreground", iconClass)} />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold group-hover:text-primary transition-colors duration-300">
          {value}
        </div>
        <p className="text-xs text-muted-foreground mt-0.5">
          {note || "Registered in system"}
        </p>
      </CardContent>
    </Card>
  );
};

export default StatsCard;
