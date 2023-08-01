import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Main } from "../pages/Main";
import  Login  from "../pages/Login";
import {Account} from "../pages/Account";
import NamgyuLogin from "../namgyu/NamgyuLogin";
import NamgyuSignup from "../namgyu/NamgyuSignup";
import Redirection from "../namgyu/Redirection";



const queryClient = new QueryClient();


export const Router = () => {
  return (
    <QueryClientProvider client={queryClient}>
        <BrowserRouter>
            <Routes>    
            <Route path="/" element={<Main />} />
            <Route path="/login" element={<Login />} />
            <Route path="/account" element={<Account />} />
            <Route path="/namgyulogin" element={<NamgyuLogin />} />
            <Route path="/namgyusignup" element={<NamgyuSignup />} />
            <Route path="/api/auth/kakao" element={<Redirection />} />
            </Routes> 
        </BrowserRouter>
    </QueryClientProvider>
  )
}
