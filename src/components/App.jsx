
import { BrowserRouter, Routes, Route } from "react-router-dom"

import { Toaster } from "@/components/ui/toaster"

import { Nav } from '@/components/Nav/Nav';

import { NotFound } from '@/features/NotFound/NotFound';
import { AuthRegister } from '@/features/Auth/AuthRegister';
import { AuthLogin } from '@/features/Auth/AuthLogin';
import { AuthContextProvider } from '@/features/Auth/AuthContext';
import { RequireAuth } from '@/features/Auth/RequireAuth';
import { Shop } from '@/features/Shop/Shop';
import { Fav } from '@/features/Fav/Fav';
import { Profile } from "@/features/Profile/Profile";
import { ProfileAddress } from "@/features/Profile/ProfileAddress";


function App() {
  return (
    <AuthContextProvider>
      <h1 className="text-black">[LOGO] React Tea&Coffee</h1>
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route path="/" element={<h1>Home</h1>} />
          <Route path="shop" element={<Shop />} />
          <Route path="fav" element={
            <RequireAuth>
              <Fav />
            </RequireAuth>
          } />
          <Route path="profile" element={
            <RequireAuth>
              <ProfileAddress />
              <Profile />
            </RequireAuth>
          } />
          <Route path="login" element={<AuthLogin />} />
          <Route path="register" element={<AuthRegister />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Toaster />
      </BrowserRouter>
    </AuthContextProvider>
  );
}

export default App
