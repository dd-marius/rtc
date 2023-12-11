
import { BrowserRouter, Routes, Route } from "react-router-dom"

import { Toaster } from "@/components/ui/toaster"

import { Nav } from '@/components/Nav/Nav';

import { NotFound } from '@/features/NotFound/NotFound';
import { Auth } from '@/features/Auth/Auth';
import { AuthContextProvider } from '@/features/Auth/AuthContext';
import { RequireAuth } from '@/features/Auth/RequireAuth';
import { Shop } from '@/features/Shop/Shop';
import { Fav } from '@/features/Fav/Fav';

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
          <Route path="login" element={<Auth />} />
          <Route path="register" element={<Auth />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Toaster />
      </BrowserRouter>
    </AuthContextProvider>
  );
}

export default App
