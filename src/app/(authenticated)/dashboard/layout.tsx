import type { JSX, ReactNode } from "react";

type LayoutProps = {
  children: ReactNode;
};

/**
 * Dashboard Layout component that wraps its children.
 *
 * @param {object} props - The layout properties.
 * @param {ReactNode} props.children - The child components to be rendered within the layout.
 * @returns {JSX.Element} The rendered layout with children.
 */
const Layout = ({ children }: LayoutProps): JSX.Element => {
  return <>{children}</>;
};

export default Layout;
