import { Button } from "@/components/ui/button";
import { Copy, CopyCheck } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const DataField = ({
  label,
  value,
  canCopy,
}: {
  label: string;
  value?: string | number;
  canCopy?: boolean;
}) => {
  const [isCopied, setIsCopied] = useState(false);
  const handleCopy = async () => {
    setIsCopied(true);
    if (!value) return;
    await navigator.clipboard.writeText(value.toString());
    toast.success(`${label} copied successfully.`);

    setTimeout(() => {
      setIsCopied(false);
    }, 2000);
  };
  return (
    <div className="flex flex-col items-start gap-1">
      <span className={``}>{label}</span>
      <div
        className={`border border-border w-full flex-1 p-1.5 px-2 rounded-xl bg-muted text-muted-foreground relative`}
      >
        {value || "N/A"}

        {canCopy && (
          <button
            className={`absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer text-sm`}
            aria-label={`copy ${label}`}
            onClick={handleCopy}
          >
            {isCopied ? (
              <CopyCheck className={` size-4.5 text-foreground`} />
            ) : (
              <Copy
                className={` size-4.5 hover:text-foreground transition-colors duration-300`}
              />
            )}
          </button>
        )}
      </div>
    </div>
  );
};

export default DataField;
