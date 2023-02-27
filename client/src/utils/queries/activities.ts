const fetcher = (input: RequestInfo | URL, init?: RequestInit) => {
    return fetch(input, init);
}

const baseUrl = process.env['REACT_APP_BACKEND_URL'];

const activityQuery = (queryKeys: any[], slug: string) => {
    return [
        ['ACTIVITIES', ...queryKeys],
        () => fetcher(baseUrl + slug)
    ]
};

const Activities = {
    "EDITIONS": activityQuery(['EDITIONS'], '/editions'),
}

export default Activities;