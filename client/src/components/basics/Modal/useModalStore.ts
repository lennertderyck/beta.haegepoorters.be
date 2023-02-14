import create from "zustand";
import createStore from 'zustand/vanilla'
import { uniqueId } from "lodash";
import { ModalState } from "./Modal.types";

const defaultState = {
    remoteId: null,
    open: false,
};

interface ModalStore {
    modals: ModalState[];
    registerModal: () => string;
    // unregisterModalById: (modalId: string) => void;
    // checkRegistrationById: (modalId: string) => boolean;
}

const modalStore = createStore<ModalStore>((set) => ({
    modals: [],
    
    registerModal: () => {
        const remoteId = uniqueId();
        const remote = {
            ...defaultState,
            id: remoteId,
        };
        
        set((state) => ({
            modals: [...state.modals, remote]
        }))
        
        return remoteId;
    }
}));

export default modalStore;