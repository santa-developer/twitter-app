import { useNavigate } from "react-router-dom";
import { LuHouse } from "react-icons/lu";
import { FaRegUserCircle } from "react-icons/fa";
import { TbLogout } from "react-icons/tb";

const MenuList = () => {
  const navigate = useNavigate();
  return (
    <div className='footer'>
      <div className='footer__grid'>
        <button type='button' onClick={() => navigate("/")}>
          <LuHouse /> Home
        </button>
        <button type='button' onClick={() => navigate("/profile")}>
          <FaRegUserCircle /> Profile
        </button>
        <button type='button' onClick={() => navigate("/")}>
          <TbLogout /> Logout
        </button>
      </div>
    </div>
  );
};

export default MenuList;
