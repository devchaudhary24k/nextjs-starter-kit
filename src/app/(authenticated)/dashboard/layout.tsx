import type { JSX, PropsWithChildren } from "react";

type LayoutProps = PropsWithChildren;

/**
 * Dashboard Layout component that wraps its children.
 *
 * @param LayoutProps - The layout properties.
 * @param LayoutProps.children - The child components to be rendered within the layout.
 * @returns  The rendered layout with children.
 */
const Layout = ({ children }: LayoutProps): JSX.Element => {
  return <>{children}</>;
};

export default Layout;
