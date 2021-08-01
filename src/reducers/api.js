const initialApiState = { 
    status: "idle", 
    data: undefined, 
    error: undefined 
}

const apiReducer = (state, action) => {
    switch (action.type) {
        case "loading":
            return { status: "loading", data: undefined, error: undefined };
        case "success":
            return { status: "success", data: action.payload, error: undefined };
        case "error":
            return { status: "error", data: undefined, error: action.payload };
        default:
            throw new Error("invalid action");
    }
}


export default apiReducer;
export {
    initialApiState
};