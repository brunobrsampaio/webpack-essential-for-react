// Hook
import { useCallback, useEffect, useMemo } from 'react';

// Utils
import Fetch from '~/utils/fetch';

const useFetch = (url) => {

  const instance = useMemo(() => new Fetch(url), [ url ]);

  //
  const request = (path, options) => instance.request(path, options);

  //
  const abort = useCallback(() => instance.abort(), [ instance ]);

  //
  const headers = () => instance.getHeaders();

  //
  useEffect(() => () => abort(), [ abort ]);

  return [ request, { abort, headers } ];
};

export default useFetch;