
import { BrowserRouter, Routes, Route } from "react-router-dom"

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

import { Nav } from '@/components/Nav/Nav';

import { NotFound } from '@/features/NotFound/NotFound';
import { AuthRegister } from '@/features/Auth/AuthRegister';
import { AuthLogin } from '@/features/Auth/AuthLogin';
import { AuthContextProvider } from '@/features/Auth/AuthContext';
import { CartContextProvider } from "@/features/Cart/CartContext";
import { RequireAuth } from '@/features/Auth/RequireAuth';
import { Profile } from "@/components/Profile/Profile";
import { Shop } from '@/components/Shop/Shop';
import { ShopDetails } from "@/components/Shop/ShopDetails";
import { ShopItemEdit } from "@/components/Shop/ShopItemEdit";
import { Cart } from "@/components/Cart/Cart";
import { Footer } from "@/components/Footer/Footer";
import { Header } from "@/components/Header/Header";
import { Home } from "@/components/Home/Home";
import { Order } from "@/components/Order/Order";


function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <AuthContextProvider>
      <CartContextProvider>
        <BrowserRouter> 
          <Header />
          <main className="flex-grow">
            <Nav />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="shop" element={<Shop />} />
              <Route path="shop/edit/:id?" element={
                <RequireAuth>
                  <ShopItemEdit />
                </RequireAuth>
              } />
              <Route path="shop/:id" element={<ShopDetails />} />
              <Route path="cart" element={<Cart /> } />
              <Route path="profile" element={
                <RequireAuth>
                  <Profile />
                </RequireAuth>
              } />
              <Route path="order" element={
                <RequireAuth>
                  <Order />
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
      </CartContextProvider>
      </AuthContextProvider>
    </div>
  );
}

export default App
