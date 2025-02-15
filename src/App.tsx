import Layout from "components/Layout";
import Router from "components/Router";
import { getAuth } from "firebase/auth";
import { app } from "firebaseApp";
import { useState } from "react";
import { ToastContainer } from "react-toastify";

function App() {
  const auth = getAuth(app);
  const [isAuth, setIsAuth] = useState<boolean>(!!auth?.currentUser);

  // console.log(auth, isAuth);
  return (
    <Layout>
      <ToastContainer />
      <Router isAuth={isAuth} />
    </Layout>
  );
}

export default App;
