import { useLogout } from "@/features/auth/hooks/use-logout";
import { Button } from "../ui/button";
import { LogOut, User } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { getErrorMessage } from "@/lib/get-error-message";
import { redirect } from "next/navigation";

const SidebarFooterActions = () => {
  const logoutMutation = useLogout();

  const handleLogout = () => {
    logoutMutation.mutate(undefined, {
      onSuccess: () => {
        toast.success("Logged out successfully.");
        redirect("/login");
      },
      onError: (error) => {
        toast.error(getErrorMessage(error));
      },
    });
  };
  return (
    <>
      <Link href={"/profile"}>
        <Button variant={"secondary"} className={`w-full flex justify-start`}>
          <User />
          <span>Profile</span>
        </Button>
      </Link>
      <Button
        onClick={handleLogout}
        variant={"destructive"}
        disabled={logoutMutation.isPending}
        className={`text-left flex justify-start`}
      >
        <LogOut />
        <span>{logoutMutation.isPending ? "Logging out..." : "Logout"}</span>
      </Button>
    </>
  );
};

export default SidebarFooterActions;
