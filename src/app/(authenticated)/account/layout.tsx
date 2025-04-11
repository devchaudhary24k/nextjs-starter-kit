import type { ReactNode } from "react";

type layoutProps = {
  children: ReactNode;
};

const layout = ({ children }: layoutProps) => {
  return <div>{children}</div>;
};

export default layout;
