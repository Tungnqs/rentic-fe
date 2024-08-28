import React, { useEffect } from "react";
import * as S from "./Navbar.styled";
import Logo from "./../../assets/images/rentic-logo.png";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authLogout, selectIsLogin } from "../../store/slices/auth.slice";
import { AppDispatch } from "../../store";
import { deleteCookie } from "../../utils/cookies.utils";

export interface INavbarItems {
  title: string;
  path?: string;
  popup?: React.JSX.Element;
}

interface INavbarItemsProps {
  navbarItems?: INavbarItems[];
}

const Navbar = ({ navbarItems }: INavbarItemsProps) => {
  const isLogin = useSelector(selectIsLogin);
  const dispatch = useDispatch<AppDispatch>();
  const handleLogout = () => {
    dispatch(authLogout());
  };
  const navigate = useNavigate();
  return (
    <S.Layout>
      <S.Container>
        <div className="flex items-center gap-3">
          <S.LogoGroup
            onClick={() => {
              navigate("/");
            }}
          >
            <S.Logo src={Logo} />
            <S.LeftItem>Rentic</S.LeftItem>
          </S.LogoGroup>
          <div className="flex items-center gap-3">
            {navbarItems &&
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
                <i className="bi bi-wallet2"></i>
                <p>Balance: 0 VND</p>
              </S.Balance>
              <S.SubscribeBtn>Deposit</S.SubscribeBtn>
            </>
          )}
          {isLogin ? (
            <div className="flex gap-3 items-center">
              <S.UserAvatar src="https://avatars.preply.com/i/logos/90ee146d-c421-4333-8247-d558d988330a.jpg" />
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
