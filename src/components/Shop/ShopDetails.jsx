import { Link, useParams } from 'react-router-dom';
import { useShopApi } from "./useShopApi";
import { useAuthContext } from '@/features/Auth/AuthContext';
import { uxShowCategoryName, uxShowPriceMin } from '@/lib/uxShop';
import { useEffect, useState } from 'react';


export function ShopDetails() {
  const [ cartQuantity, setCartQuantity] = useState(1);
  const [ cartPackageType, setCartPackageType] = useState(0);
  const [ cartTotalValue, setCartTotalValue] = useState(0);
  const { id } = useParams();
  const { data: item } = useShopApi(id);
  const { user } = useAuthContext();

  useEffect(() => {
    if (item?.price != null) {
      const newValue = cartQuantity * (item.price / 1000 * Number(cartPackageType));
      setCartTotalValue(newValue);
    }
  }, [item?.price, cartQuantity, cartPackageType]);

  if (!item) {
    return <strong>Loading ...</strong>;
  }

  function handleQuantityClick(value) {
    const newCartQuantity = cartQuantity + value;
    if (newCartQuantity < 1) {
      return;
    } else if (newCartQuantity > item.stock ) {
      return;
    }
    else {
      setCartQuantity(newCartQuantity);
    }
  }

  function handleQuantityChange(e) {
    let valueQuantity = e.target.value;
    if (isNaN(valueQuantity) || (valueQuantity < 1)) valueQuantity = 1;
    else if (valueQuantity > item.stock) valueQuantity = item.stock;
    setCartQuantity(valueQuantity);
  }

  function handleSelectChangePackageType(e) {
    setCartPackageType(e.target.value);
  }

  function handlePlaceOrder(e) {
    e.preventDefault();

    const cartOrder = {
      userID: user.id,
      cartItemId: Number(id),
      cartQuantity,
      cartPackageType: Number(cartPackageType),
      cartTotalValue
    }
    
    console.log("AddToCart: ", cartOrder);
  }

  function renderDisplayPrice(price) {
    if (price > 0) {
      return (
        <>
        <div className="md:col-span-1 flex md:justify-end items-center">Total:</div>
        <div className="md:col-span-2">
        <p className="text-lg font-semibold md:col-span-3">
          {price.toFixed(2)}<span className="text-sm font-normal"> lei</span>
        </p>
        </div>
        </>
      )
    } else {
      return (
        <p className="text-center text-xs md:col-span-3">
        Va rugam selectati o varianta de gramaj pentru a calcula pretul!
        </p>
      )
    }
  }

  return (
    <>
    {/* <Link to="/shop">Back</Link> */}
    <div className="container mx-auto p-4 max-w-[700px] w-full">
    <div className="grid md:grid-cols-2 gap-4">
      <div className="mb-4 md:mb-0">
          <img src={item.picture} alt={`Picture for ${item.name}`} className="max-w-[300px] w-full h-auto object-cover rounded-lg" />
      </div>
      <div>
          <h1 className="text-2xl font-bold mb-2">{item.name}</h1>
          <p className="mb-2 font-semibold">De la: {uxShowPriceMin(item.price)} lei</p>
          <div className="border-b border-dashed border-gray-400 my-2"></div>
          <p className="mb-4">Categorie: {uxShowCategoryName(item.type)}</p>

          <h1 className="text-xl mb-2">Descriere:</h1>
          <p className="mb-4">{item.content}</p>
          <p className="mb-4">Stoc disponibil: {item.stock}</p>
          
          <div className="border-b border-dashed border-gray-400 my-2"></div>
          
          <div className="flex justify-center w-full">
          <form className="max-w-[800px] w-full">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full mb-4">
                <div className="md:col-span-1 flex md:justify-end items-center">
                    <label htmlFor="gramaj" className="mr-2">Gramaj:</label>
                </div>
                <div className="md:col-span-2">
                    <select value={cartPackageType} onChange={handleSelectChangePackageType} className="border border-gray-300 rounded-md p-2 w-full">
                        <option value="0" >Alege o optiune</option>
                        <option value="100" className="attached enabled">100g</option>
                        <option value="200" className="attached enabled">200g</option>
                    </select>
                </div>

                <div className="md:col-span-1 flex md:justify-end items-center">
                    <label className="mr-2">Cantitate:</label>
                </div>
                <div className="md:col-span-2 flex items-center">
                    <button type="button" onClick={() => handleQuantityClick(-1)} className="px-3 border bg-red-500 text-white">-</button>
                    <input type="text" onChange={(e) => handleQuantityChange(e)} className="w-12 text-center border-t border-b" value={cartQuantity} />
                    <button type="button" onClick={() => handleQuantityClick(1)} className="px-3 border bg-green-500 text-white">+</button>
                </div>
                {renderDisplayPrice(cartTotalValue)}
            </div>
            <div className="border-b border-dashed border-gray-400 my-2"></div>
            <div className="flex justify-center">
                <button type="submit" 
                  disabled={ cartTotalValue === 0 } 
                  onClick={(e) => handlePlaceOrder(e)} 
                  className={`px-4 py-2 rounded ${cartTotalValue === 0 ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-700'} text-white`}>
                    Adauga in cos
                </button>
            </div>
          </form>
        </div>
      </div>
     </div>
    </div>
    </>
  )

}