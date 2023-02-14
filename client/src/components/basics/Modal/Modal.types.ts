export interface ModalState {
    open: boolean;
}

export interface ModalActions {
    open: () => void;
    close: () => void;
}

export type ModalRemote = [
    ModalState,
    ModalActions
]