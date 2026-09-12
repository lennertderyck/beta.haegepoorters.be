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
  return (
    queryInput: string,
    parameters: URLSearchParams = new URLSearchParams()
  ) => {
    return async () => {
      const enabled = await resolveValue(options.enable);

      if (!enabled)
        return Promise.reject(new Error("Query factory is disabled"));

      const requestBase = await resolveValue(baseRequest);
      const endpoint = new URL(queryInput, requestBase.url);
      endpoint.search = parameters.toString();

      const request = new Request(endpoint.toString(), requestBase);

      return fetch(request);
    };
  };
};

export default CreateQueryFactory;
