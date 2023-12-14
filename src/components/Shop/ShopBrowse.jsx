import { ShopItem } from "./ShopItem";
import { useShopApi } from "./useShopApi";

export function ShopBrowse() {
  const { data } = useShopApi();
  return (
    <section className="max-w-screen-xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Produse</h1>
      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-4">
      {!data && <strong>Loading ...</strong>}
      {data && data.map((item) => <ShopItem key={item.id} item={item} />)}
      </div>
    </section>
  )
}