import { Observable } from 'rxjs';
import { RetryDelayValue, RetryValue } from './query/core/retryer';
import {
  InfiniteQueryObserverOptions,
  InfiniteQueryObserverResult,
  MutateOptions,
  MutationStatus,
  QueryObserverOptions,
  QueryObserverResult,
} from './query/core/types';

export type QueryFunctionWithObservable<T = unknown> = (...args: any[]) => T | Promise<T> | Observable<T>;

export interface UseBaseQueryOptions<TData = unknown, TError = unknown, TQueryFnData = TData, TQueryData = TQueryFnData>
  extends Omit<QueryObserverOptions<TData, TError, TQueryFnData, TQueryData>, 'queryFn'> {
  queryFn?: QueryFunctionWithObservable<TQueryFnData>;
}

export interface UseQueryOptions<TData = unknown, TError = unknown, TQueryFnData = TData>
  extends UseBaseQueryOptions<TData, TError, TQueryFnData> {}

export interface UseInfiniteQueryOptions<
  TData = unknown,
  TError = unknown,
  TQueryFnData = TData,
  TQueryData = TQueryFnData
> extends InfiniteQueryObserverOptions<TData, TError, TQueryFnData, TQueryData> {}

export interface UseBaseQueryResult<TData = unknown, TError = unknown> extends QueryObserverResult<TData, TError> {}

export interface UseQueryResult<TData = unknown, TError = unknown> extends UseBaseQueryResult<TData, TError> {}

export interface UseInfiniteQueryResult<TData = unknown, TError = unknown>
  extends InfiniteQueryObserverResult<TData, TError> {}

export interface UseMutationOptions<TData = unknown, TError = unknown, TVariables = void, TContext = unknown> {
  mutationKey?: string | unknown[];
  onMutate?: (variables: TVariables) => Promise<TContext> | TContext;
  onSuccess?: (data: TData, variables: TVariables, context: TContext | undefined) => Promise<void> | void;
  onError?: (error: TError, variables: TVariables, context: TContext | undefined) => Promise<void> | void;
  onSettled?: (
    data: TData | undefined,
    error: TError | null,
    variables: TVariables,
    context: TContext | undefined
  ) => Promise<void> | void;
  retry?: RetryValue<TError>;
  retryDelay?: RetryDelayValue;
  useErrorBoundary?: boolean;
}

export type UseMutateFunction<TData = unknown, TError = unknown, TVariables = void, TContext = unknown> = (
  variables: TVariables,
  options?: MutateOptions<TData, TError, TVariables, TContext>
) => void;

export type UseMutateAsyncFunction<TData = unknown, TError = unknown, TVariables = void, TContext = unknown> = (
  variables: TVariables,
  options?: MutateOptions<TData, TError, TVariables, TContext>
) => Promise<TData>;

export interface UseMutationResult<TData = unknown, TError = unknown, TVariables = unknown, TContext = unknown> {
  context: TContext | undefined;
  data: TData | undefined;
  error: TError | null;
  failureCount: number;
  isError: boolean;
  isIdle: boolean;
  isLoading: boolean;
  isPaused: boolean;
  isSuccess: boolean;
  mutate: UseMutateFunction<TData, TError, TVariables, TContext>;
  mutateAsync: UseMutateAsyncFunction<TData, TError, TVariables, TContext>;
  reset: () => void;
  status: MutationStatus;
  variables: TVariables | undefined;
}