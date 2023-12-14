
import { BrowserRouter, Routes, Route } from "react-router-dom"

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

import { Nav } from '@/components/Nav/Nav';

import { NotFound } from '@/features/NotFound/NotFound';
import { AuthRegister } from '@/features/Auth/AuthRegister';
import { AuthLogin } from '@/features/Auth/AuthLogin';
import { AuthContextProvider } from '@/features/Auth/AuthContext';
import { RequireAuth } from '@/features/Auth/RequireAuth';
import { Profile } from "@/features/Profile/Profile";
import { ProfileAddress } from "@/features/Profile/ProfileAddress";
import { Fav } from '@/components/Fav/Fav';
import { Shop } from '@/components/Shop/Shop';
import { ShopDetails } from "@/components/Shop/ShopDetails";


function App() {
  return (
    <AuthContextProvider>
      <h1 className="text-black">[LOGO] React Tea&Coffee</h1>
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route path="/" element={<h1>Home</h1>} />
          <Route path="shop" element={<Shop />} />
          <Route path="shop/:id" element={<ShopDetails />} />
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
        <ToastContainer />
      </BrowserRouter>
    </AuthContextProvider>
  );
}

export default App
