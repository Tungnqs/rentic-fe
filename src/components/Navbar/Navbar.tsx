import React from "react";
import * as S from "./Navbar.styled";
import Logo from "./../../assets/images/tk-logo.png";

const Navbar = () => {
  return (
    <S.Layout>
      <S.Container>
        <S.LeftNavbar>
          <S.Brand>
            <p>TK-<b>Tutor</b></p>
            <S.Logo src={Logo} />
          </S.Brand>
          <S.LeftItem>Find tutors</S.LeftItem>
        </S.LeftNavbar>
        <S.RightNavbar>
          <S.Balance>
              <i className="bi bi-wallet2"></i>
            <p>Balance: 0 lessons</p>
          </S.Balance>
          <S.SubcribeBtn>Subcribe</S.SubcribeBtn>
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
          <S.UserAvatar src="https://avatars.preply.com/i/logos/90ee146d-c421-4333-8247-d558d988330a.jpg" />
        </S.RightNavbar>
      </S.Container>
    </S.Layout>
  );
};

export default Navbar;
