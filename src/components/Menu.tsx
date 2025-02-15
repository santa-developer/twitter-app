import { useNavigate } from "react-router-dom";
import { LuHouse } from "react-icons/lu";
import { FaRegUserCircle } from "react-icons/fa";
import { TbLogout, TbLogin } from "react-icons/tb";

import { useContext } from "react";
import AuthContext from "context/AuthContext";

const MenuList = () => {
  const navigate = useNavigate();

  const { user } = useContext(AuthContext);
  return (
    <div className='footer'>
      <div className='footer__grid'>
        <button type='button' onClick={() => navigate("/")}>
          <LuHouse /> Home
        </button>
        <button type='button' onClick={() => navigate("/profile")}>
          <FaRegUserCircle /> Profile
        </button>
        {user === null ? (
          <button type='button' onClick={() => navigate("/users/login")}>
            <TbLogin /> LogIn
          </button>
        ) : (
          <button type='button' onClick={() => navigate("/")}>
            <TbLogout /> Logout
          </button>
        )}
      </div>
    </div>
  );
};

export default MenuList;
