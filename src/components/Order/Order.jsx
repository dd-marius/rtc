import { useEffect, useState } from "react";

import { OrderItem } from "@/components/Order/OrderItem";
import { useApi } from '@/hooks/useApi';
import { useAuthContext } from '@/features/Auth/AuthContext';


export function Order() {
  const [ orders, setOrders ] = useState(null);
  const { user, accessToken } = useAuthContext();
  const { get } = useApi('userCart');
  
  useEffect(() => {
    async function getData() {
      let data = null;
      // Handle use case when we are an ADMIN and we want to get all orders
      if (user.role == 1) {
        data = await get(null, null, { accessToken }); 
      } else {
        data = await get({ userId: user?.id }, null, { accessToken });
      }
      // Check various usecases for data types and convert if single object to array for map()
      const validData = (data) => {
        if (!data) { return null; }
        else if (Array.isArray(data)) { return data; }
        else if (Object.keys(data).length === 0) { return []; }
        else { return [data] }
      }
      setOrders(validData(data));
    }
    getData();
  }, [user, get, accessToken]);

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-4">Comenzi:</h1>
      <div className="flex flex-col w-full md:w-1/2 h-auto bg-white p-4 shadow-lg">
        { !orders && ( <p>Loading...</p>) }
        { orders && orders.length > 0 
        ? orders.map(order => ( <OrderItem key={order.id} order={order} /> ))
        : ( <p>Nu am gasit nici o comanda activa pentru utilizatorul dumneavoastra.</p> ) 
        }
      </div>
    </div>
  )
}