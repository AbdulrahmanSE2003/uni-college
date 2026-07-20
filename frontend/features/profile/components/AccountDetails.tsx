import { User } from "@/types/user.types";

import DataField from "./DataField";
import { Separator } from "@/components/ui/separator";
const AccountDetails = ({ user }: { user: User }) => {
  return (
    <div className="border border-border shadow-xs rounded-2xl p-6 bg-card">
      <h2 className="font-semibold text-lg mb-4 text-foreground">
        Account Details
        <Separator />
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <DataField
          label="Created At"
          value={new Date(user.createdAt).toLocaleDateString()}
        />
        <DataField
          label="Last Updated"
          value={new Date(user.updatedAt).toLocaleDateString()}
        />
      </div>
    </div>
  );
};

export default AccountDetails;
