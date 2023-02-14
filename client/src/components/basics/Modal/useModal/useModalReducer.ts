import { ModalState } from "../Modal.types";

type Actions = 'OPEN' | 'CLOSE';
interface ReducerState extends ModalState {};
interface ReducerAction {
    type: Actions;
};
type ModalReducer = (state: ReducerState, action: ReducerAction) => ReducerState;

export const defaultState = {
    open: false,
};

const reducer: ModalReducer = (state, action) => {
    switch (action.type) {
        case 'OPEN':
            return {
                ...state,
                open: true,
            };
        case 'CLOSE':
            return {
                ...state,
                open: false,
            };
        default:
            throw Error('Unknown action.');
    }
}

export default reducer;