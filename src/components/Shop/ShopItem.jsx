/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { uxShowCategoryName } from '@/lib/uxShop';

export function ShopItem({ item }) {
  function uxTrimStringToMaxLength(str, maxLength=200) {
    // Used for failover, we are now handling this via CSS if supported in (modern) browsers
    if (str.length > maxLength) {
        return str.substring(0, maxLength - 3) + '...';
    }
    return str;
  }

  return (
    <article className="border rounded-lg overflow-hidden relative">
      <Link className="block" to={`/shop/${item.id}`}>
        <span className="absolute top-0 left-0 bg-blue-500 text-white text-xs font-bold px-2 py-1">{uxShowCategoryName(item.type)}</span>
        
        <img className="w-full h-auto aspect-square object-cover" src={item.picture} alt={`Picture for ${item.name}`} />
        <div className="p-2">
          <h1 className="font-semibold text-md shopItem-one-line-title">{item.name}</h1>
          <p className="text-sm shopItem-five-line-description">{uxTrimStringToMaxLength(item.content)}</p>
        </div>
      </Link>
    </article>
  )
}