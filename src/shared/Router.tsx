import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Main } from "../pages/Main";
import Login from "../pages/Login";
import {Account} from "../pages/Account";
import Redirection from "../pages/Redirection";

const queryClient = new QueryClient();


export const Router = () => {
  return (
    <QueryClientProvider client={queryClient}>
        <BrowserRouter>
            <Routes>    
            <Route path="/" element={<Main />} />
            <Route path="/login" element={<Login />} />

            <Route path="/api/auth/kakao" element={<Redirection />} />

            <Route path="/account" element={<Account />} />

            </Routes> 
        </BrowserRouter>
    </QueryClientProvider>
  )
}
