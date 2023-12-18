import { FaShoppingCart } from 'react-icons/fa';
import { NavLink } from "react-router-dom";

import { useAuthContext } from '@/features/Auth/AuthContext';
import { useCartContext } from '@/features/Cart/CartContext';
import { UserMenu } from '@/components/UserMenu/UserMenu';

export function Nav() {
  const { user } = useAuthContext();
  const { cartNoItems } = useCartContext();

  return(
    <nav>
    <menu className="flex flex-col sm:flex-row justify-between items-stretch bg-gray-100">
      <div className="flex flex-col sm:flex-row">
        <li className="hover:bg-blue-100">
        <NavLink 
          className={({ isActive }) => `text-sm sm:text-base text-gray-600 hover:text-blue-500 block py-2 px-2 ${isActive ? 'bg-blue-200' : ''}`} 
          to="/">Home
        </NavLink>
        </li>
        <li className="hover:bg-blue-100">
        <NavLink 
          className={({ isActive }) => `text-sm sm:text-base text-gray-600 hover:text-blue-500 block py-2 px-2 ${isActive ? 'bg-blue-200' : ''}`} 
          to="shop">Magazin
        </NavLink>
        </li>

        <li className="hover:bg-blue-100">
        <NavLink 
          className={({ isActive }) => `text-sm sm:text-base flex items-center text-gray-600 hover:text-blue-500 py-2 px-2 ${isActive ? 'bg-blue-200' : ''}`} 
          to="cart">
          <FaShoppingCart className="mr-2" /> 
            Cos
            { cartNoItems > 0 && (
              <span className="ml-2 bg-red-500 text-white rounded-full px-2 py-1 text-xs">
                {cartNoItems}
              </span>
            )}
        </NavLink>
        </li>
      </div>
      <div className="flex flex-col sm:flex-row">
      {user === null && (  
        <>
        <li className="hover:bg-blue-100">
          <NavLink 
            className={({ isActive }) => `text-sm sm:text-base text-gray-600 hover:text-blue-500 block py-2 px-2 ${isActive ? 'bg-blue-200' : ''}`} 
            to="login">Autentificare
          </NavLink>
        </li>
        <li className="hover:bg-blue-100">
          <NavLink 
            className={({ isActive }) => `text-sm sm:text-base text-gray-600 hover:text-blue-500 block py-2 px-2 ${isActive ? 'bg-blue-200' : ''}`} 
            to="register">Inregistrare
          </NavLink>
        </li>
        </>              
      )}
      {user && (
        <UserMenu />
      )}
      </div>
    </menu>
    </nav>
  )
}