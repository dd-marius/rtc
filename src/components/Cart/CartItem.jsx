/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";

export function CartItem({ item, onQuantityChange, onRemove }) {

  return (
    <tr>
      <td>
        <Link to={`/shop/${item.shopId}`}>
        <img src={item.picture} alt={item.name} className="h-12 w-12 object-cover rounded-lg" />
        </Link>
      </td>
      <td>{item.name}</td>
      <td>{item.cartPackageType}</td>
      <td className="flex items-center justify-center">
        <button onClick={() => onQuantityChange(item.shopId, item.cartQuantity - 1)} disabled={item.cartQuantity <= 1} className="bg-gray-200 text-gray-600 hover:text-gray-700 px-2 py-1">
          -
        </button>
        <span className="mx-2">{item.cartQuantity}</span>
        <button onClick={() => onQuantityChange(item.shopId, item.cartQuantity + 1)} disabled={item.cartQuantity >= item.stock} className="bg-gray-200 text-gray-600 hover:text-gray-700 px-2 py-1">
          +
        </button>
      </td>
      <td>{item.cartPrice.toFixed(2)} lei</td>
      <td>
        <button onClick={() => onRemove(item.shopId)} className="text-red-500 hover:text-red-700">
          <i className="fas fa-times"></i>
        </button>
      </td>
    </tr>
  )
}