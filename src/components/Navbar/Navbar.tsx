import React from "react";
import * as S from "./Navbar.styled";
import Logo from "./../../assets/images/rentic-logo.png";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <S.Layout>
      <S.Container>
        <S.LeftNavbar>
          <S.Logo src={Logo} />
          <S.LeftItem>Rentic</S.LeftItem>
        </S.LeftNavbar>
        <S.RightNavbar>
          <S.Balance>
            <i className="bi bi-wallet2"></i>
            <p>Balance: 0 lessons</p>
          </S.Balance>
          <S.SubscribeBtn>Subcribe</S.SubscribeBtn>
          <S.RightIcon>
            <i className="bi bi-chat-text-fill"></i>
          </S.RightIcon>
          <S.RightIcon>
            <i className="bi bi-question-circle"></i>
          </S.RightIcon>
          <S.RightIcon>
            <i className="bi bi-heart"></i>
          </S.RightIcon>
          <S.RightIcon>
            <i className="bi bi-bell"></i>
          </S.RightIcon>
          <div className="flex gap-5">
            <Link to={'/login'} className="hover:underline cursor-pointer">Login</Link>
            <Link to={'/register'} className="hover:underline cursor-pointer">Sign up</Link>
          </div>
          <S.UserAvatar src="https://avatars.preply.com/i/logos/90ee146d-c421-4333-8247-d558d988330a.jpg" />
        </S.RightNavbar>
      </S.Container>
    </S.Layout>
  );
};

export default Navbar;
