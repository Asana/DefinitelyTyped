// Type definitions for fetch API
// Project: https://github.com/github/fetch
// Definitions by: Ryan Graham <https://github.com/ryan-codingintrigue>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

/* ************************ FETCH API DEFINITIONS ******************************
 * TS 2.2 introduced definitions for the fetch API in the dom library, but
 * prior to that it was necessary to use the types defined in
 * @types/whatwg-fetch. In order to support all versions of TS 2.x, the
 * definitions for fetch from TS 2.2 dom are duplicated here. As long as these
 * remain identical to the definitions in dom 2.2+, they cause no issues.
 *
 * One caveat to "identical" here is that type definitions cannot be duplicated,
 * and so the "RequestInfo" type has been substituted for its expansion in
 * the below definitions:
 *
 * type RequestInfo = Request|string;
 * ************************************************************************** */

interface Request extends Object, Body {
    readonly cache: string;
    readonly credentials: string;
    readonly destination: string;
    readonly headers: Headers;
    readonly integrity: string;
    readonly keepalive: boolean;
    readonly method: string;
    readonly mode: string;
    readonly redirect: string;
    readonly referrer: string;
    readonly referrerPolicy: string;
    readonly type: string;
    readonly url: string;
    clone(): Request;
}

declare var Request: {
    prototype: Request;
    new(input: Request | string, init?: RequestInit): Request;
};

interface Headers {
    append(name: string, value: string): void;
    delete(name: string): void;
    forEach(callback: ForEachCallback): void;
    get(name: string): string | null;
    has(name: string): boolean;
    set(name: string, value: string): void;
}

declare var Headers: {
    prototype: Headers;
    new(init?: any): Headers;
};

interface Response extends Object, Body {
    readonly body: ReadableStream | null;
    readonly headers: Headers;
    readonly ok: boolean;
    readonly status: number;
    readonly statusText: string;
    readonly type: string;
    readonly url: string;
    clone(): Response;
}

declare var Response: {
    prototype: Response;
    new(body?: any, init?: ResponseInit): Response;
};

interface ResponseInit {
    status?: number;
    statusText?: string;
    headers?: any;
}

interface ReadableStream {
    readonly locked: boolean;
    cancel(): Promise<void>;
    getReader(): ReadableStreamReader;
}

declare var ReadableStream: {
    prototype: ReadableStream;
    new(): ReadableStream;
};

interface ReadableStreamReader {
    cancel(): Promise<void>;
    read(): Promise<any>;
    releaseLock(): void;
}

declare var ReadableStreamReader: {
    prototype: ReadableStreamReader;
    new(): ReadableStreamReader;
};

interface Body {
    readonly bodyUsed: boolean;
    arrayBuffer(): Promise<ArrayBuffer>;
    blob(): Promise<Blob>;
    json(): Promise<any>;
    text(): Promise<string>;
}

interface URLSearchParams {
    /**
      * Appends a specified key/value pair as a new search parameter.
      */
    append(name: string, value: string): void;
    /**
      * Deletes the given search parameter, and its associated value, from the list of all search parameters.
      */
    delete(name: string): void;
    /**
      * Returns the first value associated to the given search parameter.
      */
    get(name: string): string | null;
    /**
      * Returns all the values association with a given search parameter.
      */
    getAll(name: string): string[];
    /**
      * Returns a Boolean indicating if such a search parameter exists.
      */
    has(name: string): boolean;
    /**
      * Sets the value associated to a given search parameter to the given value. If there were several values, delete the others.
      */
    set(name: string, value: string): void;
}

declare var URLSearchParams: {
    prototype: URLSearchParams;
    /**
      * Constructor returning a URLSearchParams object.
      */
    new (init?: string | URLSearchParams): URLSearchParams;
};

interface GlobalFetch {
    fetch(input: Request|string, init?: RequestInit): Promise<Response>;
}

declare function fetch(
    input: Request|string,
    init?: RequestInit|CMRequestInit):
    Promise<Response>;

interface GlobalFetch {
    // variant for navigator.credentials monkey patching
    fetch(url: Request|string, init?: CMRequestInit): Promise<Response>;
}

interface RequestInit {
    method?: string;
    headers?: any;
    body?: any;
    referrer?: string;
    referrerPolicy?: string;
    mode?: string;
    credentials?: string;
    cache?: string;
    redirect?: string;
    integrity?: string;
    keepalive?: boolean;
    window?: any;
}

interface CMRequestInit {
    method?: string;
    headers?: any;
    body?: any;
    referrer?: string;
    referrerPolicy?: string;
    mode?: string;
    credentials?: string;
    cache?: string;
    redirect?: string;
    integrity?: string;
    keepalive?: boolean;
    window?: any;
}
