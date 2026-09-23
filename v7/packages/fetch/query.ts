interface CreateQueryFactoryOptions {
  enable: boolean | (() => boolean | Promise<boolean>);
}

type RequestInput = Request | (() => Request | Promise<Request>);

const resolveValue = async <T>(value: T | (() => T | Promise<T>)) => {
  if (typeof value === "function")
    return await (value as () => T | Promise<T>)();
  return value;
};

const CreateQueryFactory = (
  baseRequest: RequestInput,
  options: CreateQueryFactoryOptions
) => {
  return <T = any>(
    queryInput: string,
    parameters: Record<string, string> = {},
    requestInit?: RequestInit
  ) => {
    return async () => {
      const enabled = await resolveValue(options.enable);

      if (!enabled)
        return Promise.reject(new Error("Query factory is disabled"));

      const requestBase = await resolveValue(baseRequest);
      const endpoint = [
        [requestBase.url, queryInput].filter(Boolean).join(""),
        new URLSearchParams(parameters).toString()
      ]
        .filter(Boolean)
        .join("?");

      const mergedHeaders = new Headers({
        ...Object.fromEntries(new Headers(requestBase.headers)),
        ...Object.fromEntries(new Headers(requestInit?.headers))
      });

      const request = new Request(endpoint.toString(), {
        ...requestInit,
        ...requestBase,
        headers: mergedHeaders
      });

      return fetch(request) as Promise<
        Omit<Response, "json"> & {
          json: () => Promise<T>;
        }
      >;
    };
  };
};

export default CreateQueryFactory;
