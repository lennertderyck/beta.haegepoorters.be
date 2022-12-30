import { useState } from "react";
import { UseCollapseState } from "./useCollapseState.types";

const useCollapseState: UseCollapseState = (defaultState = false) => {
    const [ active, setActive ] = useState(defaultState);

    const open = () => setActive(true);
    const close = () => setActive(false);
    const toggle = () => setActive((state) => !state);
    
    return [
        active,
        { open, close, toggle }
    ]
}

export default useCollapseState;