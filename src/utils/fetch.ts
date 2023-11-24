import axios from 'axios';
import Cookies from 'js-cookie';
import { useCallback, useEffect, useState } from 'react';

type IRequest = {
  url: string;
  invokeImmediately?: boolean;
} & (
  | {
      method: 'GET' | 'DELETE';
    }
  | {
      method: 'POST' | 'PUT';
      body: any;
    }
);

export const useFetch = (options: IRequest) => {
  const { url, method, invokeImmediately = true } = options;
  let body: any = null;
  if (method === 'POST' || method === 'PUT') {
    body = options.body;
  }

  const [loading, setLoading] = useState<any>(invokeImmediately || false);
  const [error, setError] = useState(null);
  const [data, setData] = useState<any>(null);
  const [status, setStatus] = useState<'pending' | 'idle' | 'revalidating'>(
    'pending'
  );

  const doRequest = useCallback(async () => {
    try {
      if (data) return data;
      setLoading(true);
      setStatus('pending');
      /* eslint-disable-next-line */

      const response = await axios({
        method,
        url,
        data: body,
        headers: {
          Authorization: `Bearer ${Cookies.get('accessToken') ?? ''}`,
        },
      });
      setLoading(false);
      setStatus('idle');
      setData(response.data);
    } catch (err: any) {
      setLoading(false);
      setError(err?.response?.data);
    }
  }, [method, url, body, data]);

  const invalidate = async () => {
    try {
      // setLoading(true);
      setStatus('revalidating');
      const response = await axios({
        method,
        url,
        data: body,
        headers: {
          Authorization: `Bearer ${Cookies.get('accessToken') ?? ''}`,
        },
      });
      setLoading(false);
      setStatus('idle');
      setData(response.data);
    } catch (err: any) {
      setLoading(false);
      setError(err?.response?.data);
    }
  };

  useEffect(() => {
    if (invokeImmediately) {
      doRequest();
    }
  }, [invokeImmediately, doRequest]);

  return { loading, error, data, invalidate, status };
};
