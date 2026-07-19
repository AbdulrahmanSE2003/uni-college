import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Grade, Subject } from "@/types/student.types";

const UserAssigning = ({ assigning }: { assigning: Subject[] | Grade[] }) => {
  return (
    <div className="space-y-2.5 pt-4 ">
      <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
        Enrolled Subjects
      </Label>
      <div className="flex flex-wrap gap-2">
        {assigning.map((assign) => (
          <Badge
            variant={"secondary"}
            key={assign._id}
            className="px-3 py-1 text-sm font-medium border border-border"
          >
            {assign?.name ?? ""}
          </Badge>
        ))}
      </div>
    </div>
  );
};

export default UserAssigning;
