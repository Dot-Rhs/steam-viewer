import React, { useState } from "react";
import "./styles.css";

const Tooltip = (props) => {
    let timeout;
    const [active, setActive] = useState(false);

    const showTip = () => {
        timeout = setTimeout(() => {
            setActive(true);
        }, props.delay || 400);
    };

    const hideTip = () => {
        clearInterval(timeout);
        setActive(false);
    };

    return (
        <div
            className="Tooltip-Wrapper"
            // When to show the tooltip
            onMouseEnter={showTip}
            onMouseLeave={hideTip}
        >
            {/* Wrapping */}
            {active && (
                <div className={`Tooltip-Tip ${ props.direction || "top" }`}>
                    {/* Content */}
                    {props.content}
                </div>
            )}
            {props.children}
        </div>
    );
};

export default Tooltip;
