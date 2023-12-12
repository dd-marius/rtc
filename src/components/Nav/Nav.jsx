import { NavLink } from "react-router-dom";
import { useAuthContext } from '@/features/Auth/AuthContext';

export function Nav() {
    const { user, logout } = useAuthContext();

    return(
        <nav>
        <menu className="flex justify-between">
            <div className="flex">
                <li className="mr-1">
                <NavLink to="/">Home</NavLink>
                </li>
                <li className="mr-1">
                <NavLink to="shop">Magazin</NavLink>
                </li>
                {user && (
                <li className="mr-1">
                <NavLink to="fav">Favorites</NavLink>
                </li>
                )}
            </div>
            <div className="flex">
            {user === null && (  
                <>
                <li className="ml-1 pl-1 pr-1">
                <NavLink to="login">Login</NavLink>
                </li>
                <li className="ml-1 pl-1 pr-1">
                <NavLink to="register">Register</NavLink>
                </li>
                </>              
            )}
            {user && (
                <>
                <li className="ml-1 pl-1 pr-1">
                You are logged in as: <NavLink to="profile">{user.nameLast}!</NavLink>
                </li>
                <li className="ml-1 pl-1 pr-1">
                    <a
                    href="#"
                    onClick={(e) => {
                        e.preventDefault();
                        logout();
                    }}
                    >
                    Logout
                    </a>
                </li>
                </>
            )}
            </div>
        </menu>
        </nav>
    )
}