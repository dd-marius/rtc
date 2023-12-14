import { useEffect, useState } from 'react';
import { useApi } from '@/hooks/useApi';
import { useAuthContext } from '@/features/Auth/AuthContext';

export function useShopApi(id, shouldRequestOnLoad = true) {
  const [data, setData] = useState(null);
  const { accessToken } = useAuthContext();
  const { get } = useApi('shop');

  useEffect(() => {
    async function getData() {
      let data = await get(null, id);
      // Handle case when there is no data
      if (Object.keys(data).length === 0)
      { 
        data = []
      }
      console.log(data);
      setData(data);
    }

    if (shouldRequestOnLoad) {
      getData();
    }
  }, [id, get, shouldRequestOnLoad]);

  return {data};
}