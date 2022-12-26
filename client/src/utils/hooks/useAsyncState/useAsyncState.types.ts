export type Error<ErrorObject = any> = ErrorObject;

export type AnonymousResponse = any;

export interface States<Data = any> {
    data: Data | undefined;
    loading: boolean;
    error: Error | undefined;
}

export interface StateControllers<Data = any> {
    initiate: () => void;
    fulfill: (responseData: Data) => void;
    cancel: () => void;
    cancelWithError: (error: Error) => void;
    reset: () => void;
}

export type UseAsyncState = <Data = AnonymousResponse>(statesOnRender?: Partial<States<Data>>) => [
    States<Data>, 
    StateControllers<Data>
]