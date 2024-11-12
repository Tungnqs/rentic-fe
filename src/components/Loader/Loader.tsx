import React from "react";
import * as S from "./Loader.styled";

const Loader = () => {
  return (
    <S.LoaderContainer>
      <S.SpinnerContainer>
        <S.Loader>
          <S.Spinner>
            <S.FirstCircle />
            <S.SecondCircle />
            <S.ThirdCircle />
          </S.Spinner>
        </S.Loader>
      </S.SpinnerContainer>
    </S.LoaderContainer>
  );
};

export default Loader;