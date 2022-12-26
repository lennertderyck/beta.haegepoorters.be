import { useState } from "react";
import { UseCollapseState } from "./useCollapseState.types";

const useCollapseState: UseCollapseState = () => {
    const [ active, setActive ] = useState(false);

    const open = () => setActive(true);
    const close = () => setActive(false);
    const toggle = () => setActive((state) => !state);
    
    return [
        active,
        { open, close, toggle }
    ]
}

export default useCollapseState;