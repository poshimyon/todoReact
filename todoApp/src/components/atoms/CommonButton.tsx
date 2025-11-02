import { useState } from "react";

export const CommonButton = () => {
    const [count, setCount] = useState(0);

    return (
        <button onClick={() => setCount((count) => count + 1)}>
            count is {count}
        </button>
    );
};
