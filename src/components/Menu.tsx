import { useNavigate } from "react-router-dom";
import { LuHouse } from "react-icons/lu";
import { FaRegUserCircle } from "react-icons/fa";
import { TbLogout, TbLogin } from "react-icons/tb";
import { IoSearch, IoNotificationsOutline } from "react-icons/io5";

import { useContext } from "react";
import AuthContext from "context/AuthContext";
import { getAuth, signOut } from "firebase/auth";
import { app } from "firebaseApp";
import { toast } from "react-toastify";
import useTranslation from "hooks/useTranslation";

const MenuList = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const t = useTranslation();

  // 로그아웃 이벤트
  const handleLogout = async () => {
    try {
      const auth = getAuth(app);
      await signOut(auth);

      toast.success(t("ALERT_LOGOUT"));
      navigate("/users/login");
    } catch (error: any) {
      toast.error(error.message);
    }
  };
  return (
    <div className='footer'>
      <div className='footer__grid'>
        <button type='button' onClick={() => navigate("/")}>
          <LuHouse /> {t("MENU_HOME")}
        </button>
        <button type='button' onClick={() => navigate("/profile")}>
          <FaRegUserCircle /> {t("MENU_PROFILE")}
        </button>
        <button type='button' onClick={() => navigate("/search")}>
          <IoSearch /> {t("MENU_SEARCH")}
        </button>
        <button type='button' onClick={() => navigate("/notifications")}>
          <IoNotificationsOutline /> {t("MENU_NOTI")}
        </button>
        {user === null ? (
          <button type='button' onClick={() => navigate("/users/login")}>
            <TbLogin /> {t("MENU_LOGIN")}
          </button>
        ) : (
          <button type='button' onClick={handleLogout}>
            <TbLogout /> {t("MENU_LOGOUT")}
          </button>
        )}
      </div>
    </div>
  );
};

export default MenuList;
