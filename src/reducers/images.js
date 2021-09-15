const initialImageState = {
    loading: true,
    loaded: false,
    error: false
}

const imageReducer = (state, action) => {
    switch (action) {
        case 'loading':
            return { loading: true, loaded: false, error: false }
        case 'loaded':
            return { loading: false, loaded: true, error: false }
        case 'error':
            return { loading: false, loaded: false, error: true }
        default: throw new Error('No corresponding state found')
    }
}

export default imageReducer
export {
    initialImageState
}