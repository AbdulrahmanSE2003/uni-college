import { User } from "@/types/user.types";
import DataField from "./DataField";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const PersonalDetails = ({ user }: { user: User }) => {
  return (
    <div className="border border-border shadow-xs rounded-2xl p-6 bg-card">
      <h2 className="font-semibold text-lg mb-4 text-foreground">
        Personal Details
        <Badge
          variant={"secondary"}
          className={cn(
            `mx-3 capitalize`,
            user.role === "admin"
              ? "bg-destructive/10 text-destructive"
              : "bg-primary/10 text-primary",
          )}
        >
          {user.role}
        </Badge>
        <Separator className={`my-2`} />
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <DataField label="Name" value={user.name} />

        <DataField label="Email" value={user.email} canCopy />
        <DataField label="Phone" value={user.phone} />
        <DataField label="Gender" value={user.gender} />
      </div>
    </div>
  );
};

export default PersonalDetails;
