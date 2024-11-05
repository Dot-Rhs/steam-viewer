import { useRef, useState } from "react";
import { useClickOutside } from ".";

export const UseClickOutsideTest = () => {
  const clickRef = useRef();
  const [showContent, setShowContent] = useState(false);
  useClickOutside(clickRef, () => setShowContent(false));

  return (
    <div>
      {showContent ? (
        <div ref={clickRef}>
          <h1>Some content</h1>
          <p>click outside to close</p>
        </div>
      ) : (
        <button onClick={() => setShowContent((prev) => !prev)}>Click</button>
      )}
    </div>
  );
};
