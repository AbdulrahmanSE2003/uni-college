import Copy from "@/components/shared/Copy";

const DataField = ({
  label,
  value,
  canCopy,
}: {
  label: string;
  value: string | number;
  canCopy?: boolean;
}) => {
  return (
    <div className="flex flex-col items-start gap-1">
      <span className={``}>{label}</span>
      <div
        className={`border border-border w-full flex-1 p-1.5 px-2 rounded-xl bg-muted text-muted-foreground relative flex items-center group gap-1`}
      >
        {value || "N/A"}

        {canCopy && <Copy value={value?.toString()} />}
      </div>
    </div>
  );
};

export default DataField;
