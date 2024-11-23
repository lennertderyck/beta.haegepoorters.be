import { QueryKey } from "@tanstack/react-query";
import axios from "axios";
import { Endpoint } from "../../../../types/general";

interface Options {
  params?: any;
}

export const QueryFactory = <T>(queryKey: QueryKey, endpoint: Endpoint, options?: Options) => {
  const resolvedEndpoint = process.env.REACT_APP_BACKEND_URL + endpoint;
  
  return {
    queryKey,
    queryFn: () => axios<T>(resolvedEndpoint, {
      params: options?.params,
    }).then((res) => res.data),
  };
};