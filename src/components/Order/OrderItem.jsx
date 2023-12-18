/* eslint-disable react/prop-types */
import { useAuthContext } from '@/features/Auth/AuthContext';

import { OrderProducts } from "@/components/Order/OrderProducts";

export function OrderItem({ order }) {
  const { user } = useAuthContext();

  //TODO: Validate if "order" Object has all required fields for output

  const formattedDateTime = new Date(order.orderTimestamp).toLocaleString("en-US", {
    dateStyle: 'medium', 
    timeStyle: 'long'
  });

  function formatedAddress(addr) {
    if (!addr || addr.length === 0) return 'Nu am gasit adresa pentru aceasta comanda!';
    const address = addr[0];
    return (
      <span>
        [{address.tag}]<br />
        {address.address}, {address.city}, {address.county}<br />
        Tel: {address.phoneNo}
      </span>
    );
  }

  if (!order) {
    return ( <p>Loading...</p>)
  }

  return (
    <div className="border-b border-gray-200 mb-4">
      <h2 className="text-lg font-semibold">Comanda # {order.id}</h2>
      
      <div className="grid grid-cols-[auto,1fr] gap-1">
        {user.role === 1 && (
          <>
          <p>ID Utilizator:</p>
          <p>{order.userId}</p>
          </>
        )}
        <p>Data comanda:</p>
        <p>{formattedDateTime}</p>
        <p>SubTotal Produse:</p>
        <p>{order.orderProductsTotalPrice.toFixed(2)} lei</p>
        <p>SubTotal Transport:</p>
        <p>{order.orderShippingFee.toFixed(2)} lei</p>
        <p>Total:</p>
        <p>{order.orderTotalBilledPrice.toFixed(2)} lei</p>
        <p>Adresa de livrare:</p>
        <p>{formatedAddress(order.orderShippingAddress)}</p>        
        <p>Status:</p>
        <p>{order.orderStatus === 0 ? 'Preluata' : 'Procesata'}</p>
      </div>
      <div className="border-b border-dashed border-gray-300 my-4"></div>
      <div>
        {order.cartItems.map(item => (
          <OrderProducts key={item.shopId} item={item} />
        ))}
      </div>
    </div>
  );
}