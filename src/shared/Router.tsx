import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Main } from "../pages/Main";
import Login from "../pages/Login";
import {Account} from "../pages/Account";
import Redirection from "../pages/Redirection";
import Signup from "../pages/Signup";
import PostWriting from "../pages/PostWriting";
import ChatRoom from "../pages/ChatRoom";
import ChatRoomList from "../pages/ChatRoomList";
import CreateChatRoomPage from "../pages/CreateChatRoomPage";
import FindPassword from "../pages/FindPassword";

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
            <Route path="/postwriting" element={<PostWriting />} />
            <Route path="/chatroom/:id" element={<ChatRoom />} />
            <Route path="/chatroomlist" element={<ChatRoomList />} />
            <Route path="/createchatroompage" element={<CreateChatRoomPage />} />
            <Route path="/findPassword" element={<FindPassword />} />
            </Routes> 
        </BrowserRouter>
    </QueryClientProvider>
  )
}
