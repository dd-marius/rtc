import { Navigate, useLocation } from 'react-router-dom';
import { useAuthContext } from '@/features/Auth/AuthContext';


// eslint-disable-next-line react/prop-types
export function RequireAuth({ children }) {
  const { user } = useAuthContext();
  const { pathname } = useLocation();

  if (!user) {
    //TODO: Show notification?
    return <Navigate to="/login" state={{ from: pathname }} />;
  }

  return children;
}
