import styled from "styled-components";

export const Layout = styled.div`
  display: flex;
  justify-content: center;
  border-bottom: 1px solid #e6e6e6;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px,
    rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
`;

export const Container = styled.div`
  width: 95%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 24px;
  @media (max-width: 768px) {
    width: 100%;
  }
`;

export const LogoGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  cursor: pointer;
`;

export const Brand = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  p {
    margin: 0;
    font-size: 30px;
    font-weight: 600;
    font-family: "Playwrite ES", cursive;
    color: #c79237;
    b {
      font-family: "Playwrite ES", cursive;
      color: black;
      font-size: 30px;
      font-weight: 600;
    }
  }
`;

export const Logo = styled.img`
  width: 50px;
  height: 50px;
`;

export const LeftItem = styled.div`
  font-size: 25px;
  font-weight: 600;
`;

export const RightNavbar = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
`;

export const Balance = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  i {
    font-size: 22px;
  }
  p {
    margin: 0;
  }
  @media (max-width: 550px) {
    display: none;
  }
`;

export const SubscribeBtn = styled.div`
  padding: 8px 16px;
  border: 2px solid black;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: #e6e6e6;
  }
  @media (max-width: 768px) {
    display: none;
  }
`;

export const RightIcon = styled.div`
  font-size: 22px;
  i {
    cursor: pointer;
    &:hover {
      color: #d13d76;
    }
  }
`;

export const UserAvatar = styled.img`
  aspect-ratio: 1/1;
  width: 50px;
  border-radius: 999px;
  border: 1px solid #000000;
  object-fit: cover;
`;
