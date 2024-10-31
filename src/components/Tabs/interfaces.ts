import { HTMLAttributes, ReactElement, ReactNode } from "react";

export interface TabListProps {
  activeTabIndex: number;
  children: ReactElement<TabItemProps> | ReactElement<TabItemProps>[];
}

export interface TabItemProps extends HTMLAttributes<HTMLDivElement> {
  label: string;
  children: ReactNode;
}
