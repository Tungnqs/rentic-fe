import styled from "styled-components";
import { BreakPoint } from "../../interfaces";

export const Layout = styled.div`
  position: sticky;
  top: 0;
  z-index: 50;
  background-color: white;
  border-bottom: 1px solid #e5e7eb;
  box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1);
`;

export const Container = styled.div`
  max-width: ${BreakPoint.xxl};
  margin: 0 auto;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 1.5rem;
  
  @media (max-width: 768px) {
    padding: 0.75rem 1rem;
  }
`;

export const LogoGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  cursor: pointer;
  transition: opacity 150ms;
  
  &:hover {
    opacity: 0.9;
  }
`;

export const Logo = styled.img`
  width: 2.5rem;
  height: 2.5rem;
  object-fit: contain;
`;

export const LeftItem = styled.div`
  font-size: 1.25rem;
  font-weight: 600;
  color: #111827;
`;

export const RightNavbar = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
`;

export const Balance = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
  color: #4b5563;
  
  @media (max-width: 768px) {
    display: none;
  }
`;

export const SubscribeBtn = styled.button`
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  background-color: #f59e0b;
  color: white;
  font-weight: 500;
  transition: all 150ms;
  
  &:hover {
    background-color: #d97706;
    transform: translateY(-1px);
  }
  
  &:active {
    transform: translateY(0);
  }
  
  @media (max-width: 768px) {
    display: none;
  }
`;

export const UserAvatar = styled.img`
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 9999px;
  object-fit: cover;
  cursor: pointer;
  border: 2px solid #f59e0b;
  transition: all 150ms;
  
  &:hover {
    transform: scale(1.05);
    border-color: #d97706;
  }
`;
