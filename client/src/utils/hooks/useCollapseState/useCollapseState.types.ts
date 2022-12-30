export interface Controllers {
    open: () => void;
    close: () => void;
    toggle: () => void;
}

export type UseCollapseState = (defaultState?: boolean) => [
    boolean,
    Controllers
]