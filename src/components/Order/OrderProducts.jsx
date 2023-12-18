/* eslint-disable react/prop-types */

export function OrderProducts({ item }) {
  
  //TODO: Validate if "item" Object has all required fields for output

  return (
    <div className="flex items-center justify-between p-2 hover:bg-gray-100">
      <div className="flex items-center">
        <img src={item.picture} alt={item.name} className="h-10 w-10 object-cover mr-2 rounded-lg" />
        <p>{item.name}</p>
      </div>
      <div>
        <p>Cantitate: {item.cartQuantity}</p>
        <p>Pret: {item.cartPrice.toFixed(2)} lei</p>
      </div>
    </div>
  );
}