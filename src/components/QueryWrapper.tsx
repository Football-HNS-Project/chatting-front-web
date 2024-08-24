import { QueryObserverResult } from "@tanstack/react-query";

import { TErrorRes } from "@typings/Axios";

import { Spinner } from "@components/Spinner";

type QueryWrapperProps<T> = {
  query: QueryObserverResult<T, TErrorRes>;
  children: (data: T) => React.ReactNode;
};

export function QueryWrapper<T>({ query, children }: QueryWrapperProps<T>) {
  const { data, error, isLoading } = query;

  if (isLoading) return <Spinner />;

  if (error) {
    throw error; // 이 에러는 상위의 ErrorBoundary에 의해 잡힙니다.
  }

  if (!data) {
    return <div>데이터가 없습니다.</div>;
  }

  return children(data);
}
