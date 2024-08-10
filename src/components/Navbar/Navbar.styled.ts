import styled from "styled-components";

export const Layout = styled.div`
  display: flex;
  justify-content: center;
  border-bottom: 1px solid #e6e6e6;
`;

export const Container = styled.div`
  width: 95%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 24px;
`;

export const LeftNavbar = styled.div`
  display: flex;
    align-items: center;
    gap: 15px;
`;

export const Brand = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  p{
    margin: 0;
    font-size: 30px;
    font-weight: 600;
    font-family: "Playwrite ES", cursive;
    color: #c79237;
    b{
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
    gap: 15px;
    align-items: center;
`;

export const Balance = styled.div`
  display:flex;
  align-items: center;
  gap: 10px;
  i{
    font-size: 22px;
  }
  p{
    margin: 0;
  }
`;

export const SubcribeBtn = styled.div`
  padding: 8px 16px;
  border: 2px solid black;
  border-radius: 5px;
  cursor: pointer;
  &:hover{
    background-color: #e6e6e6;
  }
`;

export const RightIcon = styled.div`
  font-size: 22px;
  i{
    cursor: pointer;
    &:hover{
      color: #d13d76;
    }
  }
`;

export const UserAvatar = styled.img`
    aspect-ratio: 1/1;
    width: 32px;
    height: 32px;
    border-radius: 5px;
`;
