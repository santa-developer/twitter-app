import { Route, Routes, Navigate, Link } from "react-router-dom";
import HomePage from "pages/home";
import PostListPage from "pages/posts";
import PostDetail from "pages/posts/detail";
import PostEdit from "pages/posts/edit";
import PostNew from "pages/posts/new";
import ProfilePage from "pages/profile";
import ProfileEdit from "pages/profile/edit";
import SearchPage from "pages/search";
import NotificationsPage from "pages/notifications";
import LoginPage from "pages/users/login";
import SignupPage from "pages/users/signup";

interface RouterProps {
  isAuth: boolean;
}
const Router = ({ isAuth }: RouterProps) => {
  return (
    <Routes>
      {isAuth ? (
        <>
          <Route path='/' element={<HomePage />} />
          <Route path='/posts' element={<PostListPage />} />
          <Route path='/posts/:id' element={<PostDetail />} />
          <Route path='/posts/new' element={<PostNew />} />
          <Route path='/posts/edit/:id' element={<PostEdit />} />
          <Route path='/profile' element={<ProfilePage />} />
          <Route path='/profile/edit' element={<ProfileEdit />} />
          <Route path='/notifications' element={<NotificationsPage />} />
          <Route path='/search' element={<SearchPage />} />
          <Route path='*' element={<Navigate replace to='/' />} />
        </>
      ) : (
        <>
          <Route path='/users/login' element={<LoginPage />} />
          <Route path='/users/signup' element={<SignupPage />} />
          <Route path='*' element={<Navigate replace to='/users/login' />} />
        </>
      )}
    </Routes>
  );
};

export default Router;
