import * as React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Avatar, Menu, MenuItem } from "@mui/material";
import { BiUser } from "react-icons/bi";
import { FaShoppingCart } from "react-icons/fa";
import { IoExitOutline } from "react-icons/io5";
import BackDrop from "./BackDrop";
import { logOutUser } from "../store/actions";

const UserMenu = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const { user } = useSelector((state) => state.auth);
  const open = Boolean(anchorEl);
  const dispatch=useDispatch();
  const navigate=useNavigate();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const logOutHandler = () => {
    dispatch(logOutUser(navigate))
  };

  return (
    <div className="relative">
      {/* Avatar Icon */}
      <div
        className="cursor-pointer flex items-center justify-center"
        onClick={handleClick}
      >
        <Avatar alt="User" className="w-8 h-8" />
      </div>

      {/* Dropdown Menu */}
      <Menu
        id="user-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{ "aria-labelledby": "user-avatar" }}
        className="mt-2"
      >
        {/* Profile */}
        <Link to="/profile">
          <MenuItem
            className="flex items-center space-x-2 px-4 py-2 hover:bg-gray-100"
            onClick={handleClose}
          >
            <BiUser className="text-lg text-gray-600" />
            <span className="text-gray-800 font-bold">{user?.username || "Profile"}</span>
          </MenuItem>
        </Link>

        {/* Orders */}
        <Link to="/profile/orders">
          <MenuItem
            className="flex items-center space-x-2 px-4 py-2 hover:bg-gray-100"
            onClick={handleClose}
          >
            <FaShoppingCart className="text-lg text-gray-600" />
            <span className="text-gray-800 font-medium">Orders</span>
          </MenuItem>
        </Link>
            <MenuItem onClick={logOutHandler} className="flex justify-center">
                <div className="inline-flex items-center space-x-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white font-medium rounded-md transition-all duration-200">
                    <span>Logout</span>
                    <IoExitOutline className="text-lg text-white" />
                 </div>
            </MenuItem>
        </Menu>
        {open && <BackDrop/>}
    </div>
  );
};

export default UserMenu;
