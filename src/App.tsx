import Layout from "components/Layout";
import Loader from "components/loader/Loader";
import Router from "components/Router";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { app } from "firebaseApp";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";

function App() {
  const auth = getAuth(app);
  const [isAuth, setIsAuth] = useState<boolean>(!!auth?.currentUser);
  const [init, setInit] = useState<boolean>(false);

  // console.log(auth, isAuth);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuth(true);
      } else {
        setIsAuth(false);
      }

      setInit(true);
    });
  }, [auth]); //auth 값이 바뀔 때 마다 호출
  return (
    <Layout>
      <ToastContainer />
      {/* 상태값이 변경이 됐는지 안됐는지 확인 후에 Router를 보여줌 */}
      {init ? <Router isAuth={isAuth} /> : <Loader />}
    </Layout>
  );
}

export default App;
