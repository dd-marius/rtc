import { useState } from 'react';
import { NavLink } from 'react-router-dom';

import { useAuthContext } from '@/features/Auth/AuthContext';

export function UserMenu() {
  const { user, logout } = useAuthContext();

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);
  const hideDropdown = () => setIsDropdownOpen(false);

  return (
    <div className="relative ml-4 hover:bg-blue-100 z-50">
      <button onClick={toggleDropdown} className="block py-2">
        Utilizator: {user.nameFirst}
      </button>

      {isDropdownOpen && (
        <div onMouseLeave={hideDropdown} className="absolute right-0 mt-2 py-2 w-48 bg-white rounded-lg shadow-xl z-50">
          <NavLink to="/profile" className="block px-4 py-2 text-gray-800 hover:bg-blue-100 hover:text-blue-500">
            Profil utilizator
          </NavLink>
        {user.role == 1 && (
          <>
          <NavLink to="/shop/edit" className="block px-4 py-2 text-gray-800 hover:bg-blue-100 hover:text-blue-500">
          Adauga produs nou
          </NavLink>
          <NavLink to="/" className="block px-4 py-2 text-gray-800 hover:bg-blue-100 hover:text-blue-500">
          Comenzi
          </NavLink>
          </>
          )}
          <button 
            onClick={(e) => {
              e.preventDefault();
              logout();
              hideDropdown();
            }}
            className="block px-4 py-2 text-gray-800 hover:bg-blue-100 hover:text-blue-500 w-full text-left"
          >
            Delogare
          </button>
        </div>
      )}
    </div>
  );
}