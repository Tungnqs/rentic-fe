import styled, { keyframes } from "styled-components";



const spin = keyframes`

  0% {

    transform: rotate(0deg);

  }

  100% {

    transform: rotate(360deg);

  }

`;



const pulse = keyframes`

  0%, 100% {

    opacity: 1;

  }

  50% {

    opacity: 0.5;

  }

`;



export const LoaderContainer = styled.div`

  display: flex;

  align-items: center;

  justify-content: center;

  flex-direction: column;

  gap: 1rem;

`;



export const Spinner = styled.div`

  width: 2.5rem;

  height: 2.5rem;

  border-radius: 50%;

  border: 3px solid #f3f4f6;

  border-top-color: #f59e0b;

  animation: ${spin} 1s linear infinite;

`;



export const LoadingText = styled.div`

  color: #6b7280;

  font-size: 0.875rem;

  animation: ${pulse} 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;

`;
