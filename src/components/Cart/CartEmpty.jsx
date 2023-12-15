import { Link } from "react-router-dom";

export function CartEmpty() {
  return (
  <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
    <h2 className="text-2xl font-semibold mb-4">Cosul dvs. este gol.</h2>
    <p className="mb-6 text-gray-600">Va invitam sa navigati prin magazinul nostru online si sa alegeti produsele pe care doriti sa le comandati.</p>
    <Link to="/shop" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
      Magazin
    </Link>
  </div>
  )
}