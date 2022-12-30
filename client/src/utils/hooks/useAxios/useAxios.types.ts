/* istanbul ignore file */
import { AxiosRequestConfig } from "axios";

export type Error = any;

export interface RequestState<Data> {
    data: Data | undefined,
    loading: boolean,
    error: Error | undefined,
}

export type RequestInitializer = <Data>(initialEndpoint?: string, config?: AxiosRequestConfig<Data>) => Promise<Data | Error>;
export type RequestInitializerWithData = <Data>(initialData?: Data, initialEndpoint?: string, config?: AxiosRequestConfig<Data>) => Promise<Data | Error>;

export interface RequestFunctions {
    refetch: RequestInitializer,
    cancel: () => void,
}

export type Props<Data> = RequestState<Data> & RequestFunctions;

export type Action<Data> =
| { type: 'REQUEST_INIT' }
| { type: 'REQUEST_ABORT' }
| { type: 'REQUEST_SUCCESS'; payload: Data }
| { type: 'REQUEST_FAILED'; payload: Error };

export type UseBaseAxios = <Data,>(initialEndpoint: string, config?: AxiosRequestConfig) => [
    RequestInitializer, 
    Props<Data>
];

export type UseLazyAxios = <Data,>(initialEndpoint: string, config?: AxiosRequestConfig) => [
    RequestInitializerWithData, 
    Props<Data>
];

export type UseAxios = <Data,>(endpoint: string, config?: AxiosRequestConfig) => Props<Data>