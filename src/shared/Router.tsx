import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Main } from "../pages/Main";

import {Account} from "../pages/Account";


const queryClient = new QueryClient();


export const Router = () => {
  return (
    <QueryClientProvider client={queryClient}>
        <BrowserRouter>
            <Routes>    
            <Route path="/" element={<Main />} />
            
            <Route path="/account" element={<Account />} />
            </Routes> 
        </BrowserRouter>
    </QueryClientProvider>
  )
}
