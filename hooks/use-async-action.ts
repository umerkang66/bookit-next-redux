import { useCallback, useState } from 'react';

export function useAsyncAction<T extends (...args: Parameters<T>) => any>(
  asyncAction: T
) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const actionFunc = useCallback(
    async (...args: Parameters<T>) => {
      try {
        setLoading(true);
        await asyncAction(...args);
        setLoading(false);
      } catch (err: any) {
        setLoading(false);
        setError(err.message || 'Something went wrong');
      }
    },
    [asyncAction]
  );

  return [actionFunc, loading, error] as const;
}
