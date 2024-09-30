import React, { useEffect, useMemo, useState } from "react";
import * as S from "./Navbar.styled";
import Logo from "./../../assets/images/rentic-logo.png";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  authLogout,
  selectIsLogin,
  selectUserProfile,
} from "../../store/slices/auth.slice";
import { AppDispatch } from "../../store";
import AnonymousAvatar from "../../assets/images/anonymous-avatar.png";
import { MenuIcon } from "../../assets/icon/icon";
import CollapseSidebar from "../CollapseSidebar/CollapseSidebar";
import {
  createPaymentLink,
  IDataForCreatePaymentLink,
} from "../../store/slices/payment.slice";

export interface INavbarItems {
  title: string;
  path?: string;
  popup?: React.JSX.Element;
  icon?: React.JSX.Element;
}

interface INavbarItemsProps {
  navbarItems?: INavbarItems[];
  isRenterLayout?:boolean;
}

const Navbar = ({ navbarItems, isRenterLayout }: INavbarItemsProps) => {
  const isLogin = useSelector(selectIsLogin);
  const dispatch = useDispatch<AppDispatch>();

  const navigate = useNavigate();
  const userProfile = useSelector(selectUserProfile);

  const avatar = useMemo(() => {
    if (userProfile.avatar) {
      return userProfile.avatar;
    }
    return AnonymousAvatar;
  }, [userProfile.avatar]);

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleLogout = async () => {
    await dispatch(authLogout());
    setIsSidebarOpen(false);
    navigate("/login");
  };

  return (
    <S.Layout>
      <CollapseSidebar
        handleLogout={handleLogout}
        isSidebarOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
        menuItems={navbarItems}
      />
      <S.Container>
        <div className="flex items-center gap-3">
          <div className={`flex ${isRenterLayout ? "gap-3" : "max-md:gap-3"}`}>
            {isLogin && (
              <div className={`${isRenterLayout ? "" : "max-md:block hidden"} text-secondaryYellow border-[3px] border-secondaryYellow rounded-md`}>
                <MenuIcon
                  onClick={toggleSidebar}
                  className={`${isRenterLayout ? "w-[45px]" : "max-md:w-[45px] max-md:block hidden"}`}
                />
              </div>
            )}
            <S.LogoGroup
              onClick={() => {
                navigate("/");
              }}
            >
              <S.Logo src={Logo} />
              <S.LeftItem>Rentic</S.LeftItem>
            </S.LogoGroup>
          </div>
          <div className="flex items-center gap-3 max-md:hidden">
            {!isRenterLayout && navbarItems &&
              navbarItems.map((navbarItem, index) => (
                <NavLink
                  to={navbarItem.path as string}
                  key={index}
                  className="hover:underline cursor-pointer"
                >
                  {navbarItem.title}
                </NavLink>
              ))}
          </div>
        </div>
        <S.RightNavbar>
          {isLogin && (
            <>
              <S.Balance>
                <p className="w-fit">Balance: {userProfile.balance} VND</p>
              </S.Balance>
              <S.SubscribeBtn onClick={()=>navigate("/deposit")}>Deposit</S.SubscribeBtn>
            </>
          )}
          {isLogin ? (
            <div className="flex gap-3 items-center">
              <S.UserAvatar src={avatar} />
              <div
                onClick={handleLogout}
                className="cursor-pointer hover:underline"
              >
                Logout
              </div>
            </div>
          ) : (
            <div className="flex gap-5">
              <Link to={"/login"} className="hover:underline cursor-pointer">
                Login
              </Link>
              <Link to={"/register"} className="hover:underline cursor-pointer">
                Sign up
              </Link>
            </div>
          )}
        </S.RightNavbar>
      </S.Container>
    </S.Layout>
  );
};

export default Navbar;
