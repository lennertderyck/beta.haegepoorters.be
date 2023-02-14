import { useReducer } from "react";
import reducer, { defaultState } from "./useModalReducer";
import { ModalRemote } from "../Modal.types";

interface ModalOptions {
    defaultState?: boolean;
    remote?: ModalRemote
}

type UseModal = (options?: ModalOptions) => ModalRemote;

const useModal: UseModal = (options?: ModalOptions) => {
    const [ modalState, dispatch ] = useReducer(reducer, { 
        ...defaultState, 
        open: options?.defaultState || defaultState.open 
    });

    const open = () => dispatch({ type: 'OPEN' });
    const close = () => dispatch({ type: 'CLOSE' });
    
    return options?.remote ? options.remote : [ 
        modalState, { open, close }
    ];
}

export default useModal;