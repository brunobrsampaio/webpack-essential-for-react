// Hook
import { useCallback, useEffect, useMemo } from 'react';

// Utils
import Fetch from '~/utils/fetch';

const useFetch = (url) => {

    const instance = useMemo(() => new Fetch(url), [ url ]);

    const request = (path, options) => {

        return instance.request(path, options);
    };

    const abort = useCallback(() => {

        return instance.abort();
    }, [ instance ]);

    const headers = () => {

        return instance.getHeaders();
    };

    useEffect(() => {

        return () => abort();
    }, [ abort ]);
	
    return [ request, { abort, headers } ];
};

export default useFetch;