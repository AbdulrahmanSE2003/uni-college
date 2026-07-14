import { ReactNode } from "react";

const layout = ({ children }: { children: ReactNode }) => {
  return <div className={`min-h-screen`}>{children}</div>;
};

export default layout;
