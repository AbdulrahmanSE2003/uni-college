import { useState } from "react";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { CopyCheck, CopyIcon } from "lucide-react";

const Copy = ({ value }: { value: string }) => {
  const [isCopied, setIsCopied] = useState(false);
  const handleCopy = (e: React.MouseEvent) => {
    setIsCopied(true);
    e.stopPropagation();
    if (!value) return;
    navigator.clipboard.writeText(value);
    toast("Copied!", {
      description: `Text copied to clipboard successfully.`,
    });

    setTimeout(() => {
      setIsCopied(false);
    }, 2000);
  };
  return (
    <Button
      variant="ghost"
      size="icon"
      className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
      onClick={handleCopy}
    >
      {isCopied ? (
        <CopyCheck className={`size-4`} />
      ) : (
        <CopyIcon className="size-4" />
      )}
    </Button>
  );
};

export default Copy;
