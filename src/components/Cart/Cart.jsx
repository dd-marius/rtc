import { useCartContext } from '@/features/Cart/CartContext';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { CartItem } from '@/components/Cart/CartItem';

// TODO: Move to settings
const minPriceFreeOrder = 100;
const baseCostLivrare = 20;

// TODO: import from API
const addresses = [
  { id: 1, detail: 'Adresa 1' },
  { id: 2, detail: 'Adresa 2' },
];

export function Cart() {
  const { cart, fUpdateCart } = useCartContext();
  const [ cartSubTotal, setCartSubTotal ] = useState(0);
  const [ selectedAddress, setSelectedAddress ] = useState(null);
  const [ costLivrare, setCostLivrare ] = useState(baseCostLivrare);

  useEffect(() => {
    const newPriceCartSubTotal = updateCartSubTotal(cart);
    setCartSubTotal(newPriceCartSubTotal);
    if (newPriceCartSubTotal >= minPriceFreeOrder) {
      setCostLivrare(0)
    } else {
      setCostLivrare(baseCostLivrare)
    }
  }, [cart, setCartSubTotal]);


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

  return (
    <>
    <div className="flex justify-center mt-4 mb-4">
      <div className="max-w-4xl w-full">
        {cartSubTotal < minPriceFreeOrder && (
        <div className="bg-blue-100 text-center py-2 px-4 mb-2">
          <p>Mai ai nevoie <Link to="/shop" className="text-blue-500 hover:text-blue-700">sa alegi produse</Link> de <span className="font-bold">
            {(minPriceFreeOrder-cartSubTotal).toFixed(2)} lei</span> pentru a avea livrare gratuita!</p>
        </div>
        )}
        <div className="bg-white p-4">
          <table className="min-w-full">
            <thead>
              <tr>
                <th className="text-left"></th>
                <th className="text-left">Produs</th>
                <th className="text-left">Gramaj</th>
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

          <div className="mb-4">
            <h3 className="text-lg font-semibold mb-2">Alege o adresa pentru livrare:</h3>
            {addresses.map((address) => (
              <label key={address.id} className="block mb-2">
                <input
                  type="radio"
                  name="address"
                  checked={selectedAddress === address.id}
                  onChange={() => handleAddressChange(address.id)}
                  className="mr-2"
                />
                {address.detail}
              </label>
            ))}
            <Link to="/profile" className="text-blue-500 hover:text-blue-700">Editeaza adresele tale</Link>
          </div>

          <div className="flex justify-center mt-4">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Plaseaza comanda
            </button>
          </div>
        </div>

      </div>
    </div>

    </>
  )
}