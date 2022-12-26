export interface Controllers {
    open: () => void;
    close: () => void;
    toggle: () => void;
}

export type UseCollapseState = () => [
    boolean,
    Controllers
]