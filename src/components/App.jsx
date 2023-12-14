
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
import { Shop } from '@/components/Shop/Shop';
import { ShopDetails } from "@/components/Shop/ShopDetails";
import { Cart } from "@/components/Cart/Cart";
import { Footer } from "@/components/Footer/Footer";
import { Header } from "@/components/Header/Header";
import { Home } from "@/components//Home/Home";


function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <AuthContextProvider>
        <BrowserRouter> 
          <Header />
          <main className="flex-grow">
            <Nav />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="shop" element={<Shop />} />
              <Route path="shop/:id" element={<ShopDetails />} />
              <Route path="cart" element={
                <RequireAuth>
                  <Cart />
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
          </main>
          <Footer />
          <ToastContainer />
        </BrowserRouter>
      </AuthContextProvider>
    </div>
  );
}

export default App
