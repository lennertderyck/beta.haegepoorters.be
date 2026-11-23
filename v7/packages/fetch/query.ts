interface CreateQueryFactoryOptions {
  enable: boolean | (() => boolean | Promise<boolean>);
  /** Caching options passed to `fetch` itself, a `Request` object doesn't carry them */
  cache?: Pick<RequestInit, "cache" | "next">;
}

type RequestInput = Request | (() => Request | Promise<Request>);

const resolveValue = async <T>(value: T | (() => T | Promise<T>)) => {
  if (typeof value === "function")
    return await (value as () => T | Promise<T>)();
  return value;
};

const CreateQueryFactory = (
  baseRequest: RequestInput,
  options: CreateQueryFactoryOptions,
) => {
  return <T = any>(
    queryInput: string,
    parameters: Record<string, string> = {},
    requestInit?: RequestInit,
  ) => {
    return async () => {
      const enabled = await resolveValue(options.enable);

      if (!enabled)
        return Promise.reject(new Error("Query factory is disabled"));

      const requestBase = await resolveValue(baseRequest);
      const requestBaseUrl = new URL(requestBase.url);
      const requestBaseUrlSearchParameters = new URLSearchParams(
        requestBaseUrl.searchParams,
      );

      const endpoint = [
        // Construct the full endpoint URL by combining the base URL and the query input
        [requestBaseUrl.origin, requestBaseUrl.pathname, queryInput].join(""),

        // Construct the query string from the merged search parameters
        new URLSearchParams({
          ...Object.fromEntries(requestBaseUrlSearchParameters),
          ...parameters,
        }).toString(),
      ]
        .filter(Boolean)
        .join("?");

      const mergedHeaders = new Headers({
        ...Object.fromEntries(new Headers(requestBase.headers)),
        ...Object.fromEntries(new Headers(requestInit?.headers)),
      });

      const request = new Request(endpoint.toString(), {
        ...requestInit,
        ...requestBase,
        headers: mergedHeaders,
      });

      return fetch(request, {
        cache: requestInit?.cache ?? options.cache?.cache,
        next: requestInit?.next ?? options.cache?.next,
      }) as Promise<
        Omit<Response, "json"> & {
          json: () => Promise<T>;
        }
      >;
    };
  };
};

export default CreateQueryFactory;
