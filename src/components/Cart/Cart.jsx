import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { useAuthContext } from '@/features/Auth/AuthContext';
import { useCartContext } from '@/features/Cart/CartContext';
import { useApi } from '@/hooks/useApi';
import { CartItem } from '@/components/Cart/CartItem';
import { CartEmpty } from '@/components/Cart/CartEmpty';

// TODO: Move to settings
const minPriceFreeOrder = 100;
const baseCostLivrare = 20;

export function Cart() {
  const navigate = useNavigate();
  const { user, accessToken } = useAuthContext();
  const { get } = useApi('userAddress');
  const [ userAddresses, setUserAddresses] = useState(null);
  const { cart, fUpdateCart, fResetCart } = useCartContext();
  const [ cartSubTotal, setCartSubTotal ] = useState(0);
  const [ selectedAddress, setSelectedAddress ] = useState(0);
  const [ costLivrare, setCostLivrare ] = useState(baseCostLivrare);

  useEffect(() => {
    async function getDataAddresses() {
      const data = await get({ userId: user?.id }, null, { accessToken });
      setUserAddresses(data);
    }
    if (user) {
      getDataAddresses();
    }
  }, [accessToken, user, get]);


  useEffect(() => {
    const newPriceCartSubTotal = updateCartSubTotal(cart);
    setCartSubTotal(newPriceCartSubTotal);
    if (newPriceCartSubTotal >= minPriceFreeOrder) {
      setCostLivrare(0)
    } else {
      setCostLivrare(baseCostLivrare)
    }
  }, [cart, setCartSubTotal]);

  function handleCartEmpty() {
    fResetCart();
    toast.info("Cosul dvs. a fost golit.")
    navigate("/");
  }

  function handleAddressChange(addressId) {
    setSelectedAddress(addressId);
  }

  function handleCartItemQuantityChange(itemId, newQuantity) {
    fUpdateCart(currentItems =>
      currentItems.map(item =>
        item.shopId === itemId ? { 
          ...item, 
          cartQuantity: newQuantity, 
          cartPrice: newQuantity * (item.price / 1000 * item.cartPackageType) } : item
      )
    );
  }

  function handleCartItemRemove(itemId) {
    fUpdateCart(currentItems => currentItems.filter(item => item.shopId !== itemId));
  }

  function updateCartSubTotal(cart) {
    let total = 0;
    for (let i = 0; i < cart.length; i++) {
      total += cart[i].cartQuantity * (cart[i].price / 1000 * Number(cart[i].cartPackageType));
    }
    return total;
  }

  function handlePlaceOrder() {
    console.log("Place order");
  }

  if ( cart?.length === 0 ) {
    return <CartEmpty />
  }

  return (
    <>
    <div className="flex justify-center mt-4 mb-4">
      <div className="max-w-4xl w-full">
        
        <div className="bg-blue-100 text-center py-2 px-4 mb-2">
          {cartSubTotal < minPriceFreeOrder && (
            <p>Mai ai nevoie <Link to="/shop" className="text-blue-500 hover:text-blue-700">sa alegi produse</Link> in valoare de <span className="font-bold">
            {(minPriceFreeOrder-cartSubTotal).toFixed(2)} lei</span> pentru a avea livrare gratuita!</p>
          )}
          {cartSubTotal >= minPriceFreeOrder && (
            <p>Felicitari! Ai parte de livrare gratuita.</p>
          )}
        </div>
        
        <div className="bg-white p-4">
          <table className="min-w-full">
            <thead>
              <tr>
                <th className="text-left"></th>
                <th className="text-left">Produs</th>
                <th className="text-left">Gramaj</th>
                <th className="text-left">Pret</th>
                <th className="text-center">Cantitate</th>
                <th className="text-left">Sub-total</th>
                <th className="text-left"></th>
              </tr>
            </thead>
            <tbody>
              {cart?.map(item => (
                  <CartItem 
                    key={item.shopId} 
                    item={item} 
                    onQuantityChange={handleCartItemQuantityChange} 
                    onRemove={handleCartItemRemove} 
                  />
                ))}
            </tbody>
          </table>
        </div>
        <div className="bg-white flex justify-end">
          <button onClick={handleCartEmpty} className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 text-sm rounded">
            Goleste cosul
          </button>
        </div>
        <div className="bg-white p-4 mt-4">
          <h2 className="text-xl font-semibold mb-4">Sumar comanda:</h2>

          <div className="mb-4">
            <div className="flex justify-between mb-2">
              <span>Subtotal produse:</span>
              <span>{cartSubTotal.toFixed(2)} lei</span>
            </div>
            <div className="flex justify-between mb-2">
              <span>Cost livrare:</span>
              <span>{costLivrare.toFixed(2)} lei</span>
            </div>
            <div className="flex justify-between font-bold">
              <span>Total:</span>
              <span>{(cartSubTotal+costLivrare).toFixed(2)} lei</span>
            </div>
          </div>

          { user && (
          <>
          <div className="mb-4">
            <h3 className="text-lg font-semibold mb-2">Alege o adresa pentru livrare:</h3>
            { userAddresses && userAddresses.map((address) => (
              <label htmlFor={`address_${address.id}`} key={address.id} className="block mb-2">
                <input
                  id={`address_${address.id}`}
                  type="radio"
                  checked={selectedAddress === address.id}
                  onChange={() => handleAddressChange(address.id)}
                  className="mr-2"
                />
                {`[${address.tag}] ${address.address} / ${address.city} / ${address.county} # ${address.phoneNo}`}
              </label>
            ))}
            { ( !userAddresses || userAddresses.length == 0 ) && (
              <p>Va rugam adaugati cel putin o adresa pentru a putea plasa comanda!</p>
            )}
            <Link to="/profile" className="text-blue-500 hover:text-blue-700">Editeaza adresele tale</Link>
          </div>

          <div className="flex justify-center mt-4">
            <button 
              onClick={handlePlaceOrder}
              disabled={!selectedAddress} 
              className={`font-bold py-2 px-4 rounded ${!selectedAddress ? 'bg-gray-400 text-gray-200 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-700 text-white'}`}
              >Plaseaza comanda
            </button>
          </div>
        </>
        )}
        { !user && (
          <div className="flex justify-center mt-4">
            <p>Va rugam sa va <Link to="/login" className="text-blue-500 hover:text-blue-700 pr-1">autentificati</Link>
            sau sa va <Link to="/register" className="text-blue-500 hover:text-blue-700  pr-1">inregistrati</Link> 
            pentru a putea plasa comanda!</p>
          </div>
        )}
        </div>
      </div>
    </div>

    </>
  )
}