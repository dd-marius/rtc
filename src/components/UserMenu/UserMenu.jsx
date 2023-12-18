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
    <div className="relative ml-4 hover:bg-blue-100 z-50">
      <button onClick={toggleDropdown} className="block py-2">
        Utilizator: {user.nameFirst}
      </button>

      {isDropdownOpen && (
        <div 
          ref={dropdownRef}
          onMouseLeave={hideDropdown} 
          className="absolute right-0 mt-2 py-2 w-48 bg-white rounded-lg shadow-xl z-50">

          <NavLink 
            to="/profile" 
            className={({ isActive }) => `block px-4 py-2 text-gray-800 hover:bg-blue-100 hover:text-blue-500 ${isActive ? 'bg-blue-200' : ''}`}>
            Profil utilizator
          </NavLink>
        {user.role == 1 && (
          <>
          <hr className="my-2 border-gray-200" />
          <NavLink 
            to="/shop/edit" 
            className={({ isActive }) => `block px-4 py-2 text-gray-800 hover:bg-blue-100 hover:text-blue-500 ${isActive ? 'bg-blue-200' : ''}`}>
            Adauga produs nou
          </NavLink>
          <NavLink 
            to="/" 
            className={({ isActive }) => `block px-4 py-2 text-gray-800 hover:bg-blue-100 hover:text-blue-500 ${isActive ? 'bg-blue-200' : ''}`}>
            Administrare comenzi
          </NavLink>
          </>
          )}
          <hr className="my-2 border-gray-200" />
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