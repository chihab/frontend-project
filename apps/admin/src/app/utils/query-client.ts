import { Signal, WritableSignal, signal } from '@angular/core';
import { Observable } from 'rxjs';

interface WritableQueryState<T> {
  data: WritableSignal<T | null>;
  loading: WritableSignal<boolean>;
  error: WritableSignal<string>;
  invalidate: (withLoading?: boolean) => void;
}

export interface QueryState<T> {
  data: Signal<T | null>;
  loading: Signal<boolean>;
  error: Signal<string>;
  invalidate: (withLoading?: boolean) => void;
}

const globalState: Record<string, WritableQueryState<unknown>> = {};

export function invalidateQuery(key: string, withLoading = false) {
  globalState[key]?.invalidate(withLoading);
}

export function createQuery<T>(
  key: string,
  query: () => Observable<T> | Promise<T>
): QueryState<T> {
  const isNewQuery = !globalState[key];
  globalState[key] = globalState[key] || {
    data: signal<T | null>(null),
    loading: signal<boolean>(false),
    error: signal<string>(''),
    invalidate: (withLoading = false) => {
      if (withLoading) globalState[key].loading.set(true);
      globalState[key].error.set('');
      runQuery(withLoading);
    },
  };

  const state = globalState[key] as WritableQueryState<T>;

  const runQuery = (withLoading = true) => {
    if (withLoading) state.loading.set(true);
    const result = query();
    const onSuccessfulResult = (data: T) => {
      state.data.set(data);
      state.loading.set(false);
    };
    const onFailedResult = () => {
      state.error.set('Unknown error');
      state.loading.set(false);
    };
    if (result instanceof Promise) {
      result.then(onSuccessfulResult).catch(onFailedResult);
    } else {
      result.subscribe({
        next: onSuccessfulResult,
        error: onFailedResult,
      });
    }
  };

  if (isNewQuery) runQuery();

  return {
    data: state.data.asReadonly(),
    loading: state.loading.asReadonly(),
    error: state.error.asReadonly(),
    invalidate: state.invalidate,
  };
}
