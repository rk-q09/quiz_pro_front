import { AxiosError } from 'axios';
import { QueryClient, UseQueryOptions, UseMutationOptions } from 'react-query';

// const queryConfig: DefaultOptions = {
// }

export const queryClient = new QueryClient();

export type QueryConfig<FetcherFnType extends (...args: any) => any> =
  UseQueryOptions<
    Awaited<ReturnType<FetcherFnType>>,
    unknown,
    Awaited<ReturnType<FetcherFnType>>,
    Array<string>
  >;

export type MutationConfig<FetcherFnType extends (...args: any) => any> =
  UseMutationOptions<
    Awaited<ReturnType<FetcherFnType>>,
    AxiosError,
    Parameters<FetcherFnType>[0]
  >;
