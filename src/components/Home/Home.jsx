import { ShopItem } from "@/components/Shop/ShopItem";
import { useShopApi } from "@/components/Shop/useShopApi";

export function Home() {
  const { data } = useShopApi();
  let dataTeaPromoted = null;
  let dataCoffeePromoted = null;
  // Max number of items to display for each category
  const maxDisplayItems = 6;
  // Extract promoted items once we have data from API
  if (data) {
    dataTeaPromoted = data.filter(item => item.promoted === 1 && item.type === 1);
    dataCoffeePromoted = data.filter(item => item.promoted === 1 && item.type === 2);
  }

  return (
    <>
      <section className="max-w-screen-xl mx-auto p-4">
        <h1 className="text-2xl font-bold mb-6">Ceai - Produse promovate</h1>
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-4">
        {!dataTeaPromoted && <strong>Loading ...</strong>}
        {dataTeaPromoted && dataTeaPromoted.slice(0,maxDisplayItems).map((item) => <ShopItem key={item.id} item={item} />)}
        </div>
      </section>
      <section className="max-w-screen-xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Cafea - Produse promovate</h1>
      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-4">
      {!dataCoffeePromoted && <strong>Loading ...</strong>}
      {dataCoffeePromoted && dataCoffeePromoted.slice(0,maxDisplayItems).map((item) => <ShopItem key={item.id} item={item} />)}
      </div>
    </section>
  </>
)
}