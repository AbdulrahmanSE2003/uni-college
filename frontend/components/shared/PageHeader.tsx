const PageHeader = ({
  heading,
  description,
}: {
  heading: string;
  description: string;
}) => {
  return (
    <div className={``}>
      <h1 className="text-3xl font-bold tracking-tight">{heading}</h1>
      <p className="text-muted-foreground text-sm mt-1">{description}</p>
    </div>
  );
};

export default PageHeader;
