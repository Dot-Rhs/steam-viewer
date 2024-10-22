import { ReactElement, ReactNode } from "react";

export interface TabListProps {
  activeTabIndex: number;
  children: ReactElement<TabItemProps> | ReactElement<TabItemProps>[];
}

export interface TabItemProps {
  label: string;
  children: ReactNode;
}
