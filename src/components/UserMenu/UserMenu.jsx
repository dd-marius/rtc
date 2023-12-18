import { useState, useRef, useEffect } from 'react';
import { NavLink } from 'react-router-dom';

import { useAuthContext } from '@/features/Auth/AuthContext';

export function UserMenu() {
  const { user, logout } = useAuthContext();
  const [ isDropdownOpen, setIsDropdownOpen ] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);
  const hideDropdown = () => setIsDropdownOpen(false);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        hideDropdown();
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [dropdownRef]);

  return (
    <div className="relative ml-2 hover:bg-blue-100 pr-1 z-50">
      <button onClick={toggleDropdown} className="block py-2 text-sm sm:text-base">
        Utilizator: {user.nameFirst}
      </button>

      {isDropdownOpen && (
        <div 
          ref={dropdownRef}
          onMouseLeave={hideDropdown} 
          className="absolute right-0 mt-2 py-2 w-48 bg-white rounded-lg shadow-xl z-50">

          <NavLink 
            to="/profile" 
            className={({ isActive }) => `block px-4 py-2 text-gray-800 hover:bg-blue-100 hover:text-blue-500 text-sm sm:text-base ${isActive ? 'bg-blue-200' : ''}`}>
            Profil utilizator
          </NavLink>
          <hr className="my-2 border-gray-200" />
        {user.role == 1 && (
          <NavLink 
            to="/shop/edit" 
            className={({ isActive }) => `block px-4 py-2 text-gray-800 hover:bg-blue-100 hover:text-blue-500 text-sm sm:text-base ${isActive ? 'bg-blue-200' : ''}`}>
            Adauga produs nou
          </NavLink>
        )}
          <NavLink 
            to="/order" 
            className={({ isActive }) => `block px-4 py-2 text-gray-800 hover:bg-blue-100 hover:text-blue-500 text-sm sm:text-base ${isActive ? 'bg-blue-200' : ''}`}>
            {user.role == 1 
            ? (<>Administrare comenzi</>)
            : (<>Comenzile mele</>)
            }
          </NavLink>
          <hr className="my-2 border-gray-200" />
          <button 
            onClick={(e) => {
              e.preventDefault();
              logout();
              hideDropdown();
            }}
            className="block px-4 py-2 text-gray-800 hover:bg-blue-100 hover:text-blue-500 w-full text-left text-sm sm:text-base"
          >
            Delogare
          </button>
        </div>
      )}
    </div>
  );
}