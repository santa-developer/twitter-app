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
          <LuHouse />
          <span className='footer__grid--text'>{t("MENU_HOME")}</span>
        </button>
        <button type='button' onClick={() => navigate("/profile")}>
          <FaRegUserCircle />
          <span className='footer__grid--text'>{t("MENU_PROFILE")}</span>
        </button>
        <button type='button' onClick={() => navigate("/search")}>
          <IoSearch />
          <span className='footer__grid--text'>{t("MENU_SEARCH")}</span>
        </button>
        <button type='button' onClick={() => navigate("/notifications")}>
          <IoNotificationsOutline />
          <span className='footer__grid--text'>{t("MENU_NOTI")}</span>
        </button>
        {user === null ? (
          <button type='button' onClick={() => navigate("/users/login")}>
            <TbLogin />
            <span className='footer__grid--text'>{t("MENU_LOGIN")}</span>
          </button>
        ) : (
          <button type='button' onClick={handleLogout}>
            <TbLogout />
            <span className='footer__grid--text'>{t("MENU_LOGOUT")}</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default MenuList;
