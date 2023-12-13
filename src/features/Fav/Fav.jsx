import { useAuthContext } from '@/features/Auth/AuthContext';

export function Fav() {
  const { accessToken, logout } = useAuthContext();

  return (
    <>
      <h1>Favorites</h1>
      <p>{accessToken}</p>
      <button onClick={logout}>__Logout__</button>
    </>
  )
}