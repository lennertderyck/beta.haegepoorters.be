interface CreateQueryFactoryOptions {
  enable: boolean;
}

const CreateQueryFactory = (
  baseRequest: Request,
  options: CreateQueryFactoryOptions
) => {
  return (
    queryInput: string,
    parameters: URLSearchParams = new URLSearchParams()
  ) => {
    console.log(
      "CreateQueryFactory called with queryInput:",
      queryInput,
      "and parameters:",
      parameters.toString()
    );
    if (!options.enable) {
      return () => Promise.reject(new Error("Query factory is disabled"));
    } else {
      return () => {
        const endpoint = new URL(queryInput, baseRequest.url);
        endpoint.search = parameters.toString();

        const request = new Request(endpoint.toString(), baseRequest);

        return fetch(request);
      };
    }
  };
};

export default CreateQueryFactory;
