import { FaShoppingCart } from 'react-icons/fa';

import { NavLink } from "react-router-dom";
import { useAuthContext } from '@/features/Auth/AuthContext';
import { useCartContext } from '@/features/Cart/CartContext';

export function Nav() {
  const { user, logout } = useAuthContext();
  const { cartNoItems } = useCartContext();

  return(
    <nav>
    <menu className="flex justify-between items-stretch bg-gray-100">
      <div className="flex">
        <li className="mr-4 hover:bg-blue-100">
        <NavLink 
          className={({ isActive }) => `text-gray-600 hover:text-blue-500 block py-2 px-2 ${isActive ? 'bg-blue-200' : ''}`} 
          to="/">Home
        </NavLink>
        </li>
        <li className="mr-4 hover:bg-blue-100">
        <NavLink 
          className={({ isActive }) => `text-gray-600 hover:text-blue-500 block py-2 px-2 ${isActive ? 'bg-blue-200' : ''}`} 
          to="shop">Magazin
        </NavLink>
        </li>

        <li className="mr-4 hover:bg-blue-100">
        <NavLink 
          className={({ isActive }) => `flex items-center text-gray-600 hover:text-blue-500 py-2 px-2 ${isActive ? 'bg-blue-200' : ''}`} 
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
      <div className="flex">
      {user === null && (  
        <>
        <li className="ml-4 hover:bg-blue-100">
          <NavLink 
            className={({ isActive }) => `text-gray-600 hover:text-blue-500 block py-2 px-2 ${isActive ? 'bg-blue-200' : ''}`} 
            to="login">Autentificare
          </NavLink>
        </li>
        <li className="ml-4 hover:bg-blue-100">
          <NavLink 
            className={({ isActive }) => `text-gray-600 hover:text-blue-500 block py-2 px-2 ${isActive ? 'bg-blue-200' : ''}`} 
            to="register">Inregistrare
          </NavLink>
        </li>
        </>              
      )}
      {user && (
        <>
        <li>
          <p className="block py-2">Utilizator:</p>
        </li>
        <li className="ml-4 hover:bg-blue-100">
          <NavLink 
            className={({ isActive }) => `text-gray-600 hover:text-blue-500 block py-2 px-2 ${isActive ? 'bg-blue-200' : ''}`} 
            to="profile">{user.nameFirst}
          </NavLink>
        </li>
        <li className="ml-4 hover:bg-blue-100">
            <a className="text-gray-600 hover:text-blue-500 block py-2 px-2"
            href="#"
            onClick={(e) => {
                e.preventDefault();
                logout();
            }}
            >
            Delogare
            </a>
        </li>
        </>
      )}
      </div>
    </menu>
    </nav>
  )
}