import "./App.css";
import { Route, Routes, Navigate, Link } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path='/' element={<h2>home</h2>} />
      <Route path='/posts' element={<h2>posts list page</h2>} />
      <Route path='/posts/:id' element={<h2>posts detail page</h2>} />
      <Route path='/posts/new' element={<h2>posts new page</h2>} />
      <Route path='/posts/edit' element={<h2>posts edit page</h2>} />
      <Route path='/profile' element={<h2>profile page</h2>} />
      <Route path='/profile/edit' element={<h2>profile edit page</h2>} />
      <Route path='/notifications' element={<h2>notifications page</h2>} />
      <Route path='/search' element={<h2>search page</h2>} />
      <Route path='/users/login' element={<h2>login page</h2>} />
      <Route path='/users/signup' element={<h2>signup page</h2>} />
      <Route path='*' element={<Navigate replace to='/' />} />
    </Routes>
  );
}

export default App;
