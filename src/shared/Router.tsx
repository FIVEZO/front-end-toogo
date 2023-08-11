import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Main } from "../pages/Main";
import Login from "../pages/Login";
import {Account} from "../pages/Account";
import Redirection from "../pages/Redirection";
import Signup from "../pages/Signup";
import PostWriting from "../pages/PostWriting";
import { ChatRoom } from "../pages/ChatRoom";
import FindPassword from "../pages/FindPassword";
import { CategoryPage } from "../pages/CategoryPage";
import { DetailPage } from "../pages/DetailPage";
import Post from "../pages/Post";

const queryClient = new QueryClient();


export const Router = () => {
  return (
    <QueryClientProvider client={queryClient}>
        <BrowserRouter>
            <Routes>    
            <Route path="/" element={<Main />} />
            <Route path="/login" element={<Login />} />
            <Route path="/api/auth/kakao" element={<Redirection />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/account" element={<Account />} />
            <Route path="/post/:id" element={<Post />} />
            <Route path="/postwriting/:id" element={<PostWriting />} />
            <Route path="/chatroom/:id" element={<ChatRoom />} />
            <Route path="/findPassword" element={<FindPassword />} />
            <Route path="/categorypage/:id" element={<CategoryPage />} />
            <Route path="/detailpage/:id" element={<DetailPage />} />
            </Routes> 
        </BrowserRouter>
    </QueryClientProvider>
  )
}
