import { States } from "../useAsyncState/useAsyncState.types";

interface Properties extends States<void> {
    isAvailable: boolean;
}

export type ShareController = () => Promise<void>;

export type UseShare = () => [ ShareController, Properties ];