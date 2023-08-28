import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Main } from "../pages/Main/Main";
import Login from "../pages/Login/Login";
import {Account} from "../pages/Account";
import Redirection from "../pages/Login/Redirection";
import Signup from "../pages/Signup/Signup";
import FindPassword from "../pages/FindPassword/FindPassword";
import { CategoryPage } from "../pages/CategoryPage/CategoryPage";
import { DetailPage } from "../pages/DetailPage/DetailPage";
import Post from "../pages/Post/Post";
import EditPost from "../pages/EditPost/EditPost";
import { Chat } from "../pages/Chat/Chat";
import { SearchPage } from "../pages/SearchPage/SearchPage";
import { MyPage } from "../pages/MyPage";
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
            <Route path="/mypage" element={<MyPage />} />
            <Route path="/account" element={<Account />} />
            <Route path="/post/:id" element={<Post />} />
            <Route path="/editpost/:id" element={<EditPost />} />
            <Route path="/chat/:id" element={<Chat />} />
            <Route path="/findPassword" element={<FindPassword />} />
            <Route path="/categorypage/:id" element={<CategoryPage />} />
            <Route path="/detailpage/:id" element={<DetailPage />} />
            <Route path="/SearchPage" element={<SearchPage />} />
            </Routes> 
        </BrowserRouter>
    </QueryClientProvider>
  )
}
