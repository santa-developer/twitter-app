import { useNavigate } from "react-router-dom";
import { LuHouse } from "react-icons/lu";
import { FaRegUserCircle } from "react-icons/fa";
import { TbLogout, TbLogin } from "react-icons/tb";
import { IoSearch } from "react-icons/io5";

import { useContext } from "react";
import AuthContext from "context/AuthContext";
import { getAuth, signOut } from "firebase/auth";
import { app } from "firebaseApp";
import { toast } from "react-toastify";

const MenuList = () => {
  const navigate = useNavigate();

  const { user } = useContext(AuthContext);

  // 로그아웃 이벤트
  const handleLogout = async () => {
    try {
      const auth = getAuth(app);
      await signOut(auth);

      toast.success("로그아웃 되었습니다.");
      navigate("/users/login");
    } catch (error: any) {
      toast.error(error.message);
    }
  };
  return (
    <div className='footer'>
      <div className='footer__grid'>
        <button type='button' onClick={() => navigate("/")}>
          <LuHouse /> Home
        </button>
        <button type='button' onClick={() => navigate("/profile")}>
          <FaRegUserCircle /> Profile
        </button>
        <button type='button' onClick={() => navigate("/search")}>
          <IoSearch /> Search
        </button>
        {user === null ? (
          <button type='button' onClick={() => navigate("/users/login")}>
            <TbLogin /> LogIn
          </button>
        ) : (
          <button type='button' onClick={handleLogout}>
            <TbLogout /> Logout
          </button>
        )}
      </div>
    </div>
  );
};

export default MenuList;
