import { useNavigate } from 'react-router-dom';

import { useAuthContext } from '@/features/Auth/AuthContext';
import { ShopItem } from "./ShopItem";
import { useShopApi } from "./useShopApi";

export function Shop() {
  const { user } = useAuthContext();
  const { data } = useShopApi();
  const navigate = useNavigate();

  const handleAddProduct = () => {
    navigate("/shop/edit");
  }

  return (
    <section className="max-w-screen-xl mx-auto p-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold mb-4 ">Produse</h1>
        { user && user.role == 1 && (
        <button onClick={handleAddProduct} className="bg-blue-500 hover:bg-blue-700 text-white font-bold px-2 py-1 text-sm rounded mb-4">
          Adauga produs nou
        </button>
        )}
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-4">
      {!data && <strong>Loading ...</strong>}
      {data && data.map((item) => <ShopItem key={item.id} item={item} />)}
      </div>
    </section>
  )
}