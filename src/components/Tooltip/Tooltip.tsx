import React, { useState, type HTMLProps, type ReactNode, useRef } from "react";
interface TooltipProps {
    children: ReactNode;
    content: string;
}
const Tooltip = (props: React.HTMLProps<HTMLDivElement> & TooltipProps) => {
    const [hover, setHover] = useState(false);
    const hoverTimeout = useRef<number | null>(null);

    const handleMouseEnter = () => {
        hoverTimeout.current = setTimeout(() => {
            setHover(true);
        }, 300);
    };

    const handleMouseLeave = () => {
        if (hoverTimeout.current) {
            clearTimeout(hoverTimeout.current);
            hoverTimeout.current = null;
        }
        setHover(false);
    };

    return (
        <div
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            style={{
                position: 'relative',
                display: 'flex', flexDirection:
                    'column', alignItems: 'center'
            }}>

            {hover && (
                <div style={{
                    // marginTop: '-90px',
                    position: 'absolute',
                    // left: 0,
                    // top: 0,
                    display: 'flex', justifyContent:
                        'center', gap: 0,
                    // opacity: 0.78
                    zIndex: 99999, transform: 'translateY(-100%) translateY(-6%)'
                }}>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                        <div
                            style={{
                                // whiteSpace: 'nowrap',
                                background: 'black', fontSize: '11px', fontWeight: 400, letterSpacing: 0, lineHeight: '13px', color: 'white', width: '140px', wordWrap: 'break-word', padding: '0em 1em'
                            }}
                        >
                            {props.content}
                        </div>
                        <div style={{ marginTop: '-6px' }}>▼</div>
                    </div>
                </div>
            )}
            {props.children}
        </div>
    );
};
export default Tooltip;