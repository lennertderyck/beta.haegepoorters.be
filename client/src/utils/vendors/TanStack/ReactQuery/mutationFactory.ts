import { MutationKey, QueryKey } from "@tanstack/react-query";
import axios, { AxiosResponse } from "axios";
import { Endpoint } from "../../../../types/general";
import QUERY_CLIENT from "./queryClient";

export const invalidateRelevantCache = async (queryKeys: QueryKey[] | undefined) => {
  try {
    if (!queryKeys) return Promise.resolve([]);
    else {
      const promises = queryKeys.map(keys => QUERY_CLIENT.invalidateQueries({
        queryKey: keys,
        refetchType: 'active',
      }));
      await Promise.all(promises);
      return Promise.resolve(true);
    }
  } catch {
    return Promise.reject(false);
  }
};

export const MutationFactory = <T>(mutationKey: MutationKey[], endpoint: Endpoint, method: 'POST' | 'PATCH' | 'DELETE') => {
  const resolvedEndpoint = process.env.REACT_APP_BACKEND_URL + endpoint;
    
  return {
    mutationKey,
    mutationFn: (data: T) => axios<T, AxiosResponse<{}>>({
      method,
      url: resolvedEndpoint,
      data,
    }).then(async (res) => {
      const inv = await invalidateRelevantCache(mutationKey);
      console.log(inv)
      return res.data
    }),
  };
}