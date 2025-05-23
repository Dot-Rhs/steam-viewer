import React, { useMemo, useState } from "react";
import { ReactElement } from "react";
import TabItem from "./TabItem";
import { sanitizeForId } from "../../stringUtils";
import { TabItemProps, TabListProps } from "./interfaces";

import './styles.css'

export const TabList: React.FC<TabListProps> = ({ children, activeTabIndex = 0 }) => {
    const [activeTab, setActiveTab] = useState(activeTabIndex);

    const handleTabClick = (index: number) => {
        setActiveTab(index);
    };

    const tabs = useMemo(() => React.Children.toArray(children).filter(
        (child): child is ReactElement<TabItemProps> =>
            React.isValidElement(child) && child.type === TabItem
    ), [children]);

    return (
        <div className="tabs">
            <nav className="tab-list-wrapper">
                <ul className="tab-list" role="tablist" aria-orientation="horizontal">
                    {tabs.map((tab, index) => (
                        <li key={`tab-${ index }`}>
                            <button
                                key={`tab-btn-${ index }`}
                                role="tab"
                                id={`tab-${ sanitizeForId(tab.props.label) }`}
                                aria-controls={`panel-${ sanitizeForId(tab.props.label) }`}
                                aria-selected={activeTab === index}
                                onClick={() => handleTabClick(index)}
                                className={`tab-btn ${ activeTab === index && "tab-btn--active"
                                    }`}
                            >{tab.props.label}</button>
                        </li>
                    ))}
                </ul>
            </nav>
            {tabs[activeTab]}
        </div>
    );
};