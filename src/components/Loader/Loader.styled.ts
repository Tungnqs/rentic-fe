import styled, { keyframes } from "styled-components";
export const rotate = keyframes`
  0% { transform: rotate(0); }
  100% { transform: rotate(360deg); }
`;

export const SpinnerContainer = styled.div`
  width: var(--s-15);
  height: var(--s-15);
  display: inline-block;
  overflow: hidden;
`;

export const Loader = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  transform: translateZ(0) scale(1);
  backface-visibility: hidden;
  transform-origin: 0 0;
`;

export const Spinner = styled.div`
  animation: ${rotate} 1s infinite linear;
  transform-origin: var(--s-13) var(--s-13);
`;

export const Circle = styled.div`
  position: absolute;
`;

export const FirstCircle = styled(Circle)`
  width: var(--s-14);
  height: var(--s-14);
  border: var(--s-6) solid;
  border-radius: 50%;
  border-color: transparent var(--yellow-2) var(--yellow-2) var(--yellow-2);
  box-sizing: border-box;
  transform: rotate(45deg);
  transform-origin: var(--s-13) var(--s-13);

  transform: rotate(45deg) translate(var(--s-4-larger), var(--s-4-larger));
`;

export const SecondCircle = styled(Circle)`
  width: var(--s-14);
  height: var(--s-14);
  border: var(--s-6) solid;
  border-radius: 50%;
  border-color: transparent var(--yellow-2) var(--yellow-2) var(--yellow-2);
  box-sizing: border-box;
  transform: rotate(0deg);
  transform-origin: var(--s-13) var(--s-13);

  transform: rotate(0deg) translate(var(--s-4-larger), var(--s-4-larger));
`;

export const ThirdCircle = styled(Circle)`
  width: 0;
  height: 0;
  border: var(--s-6) solid;
  border-color: transparent transparent transparent #ce8236;
  transform: translate(var(--s-13), var(--s-1-larger));
`;

export const LoaderContainer = styled.div`
  width: 100%;
  height: var(--s-16);
  display: grid;
  place-items: center;
`;