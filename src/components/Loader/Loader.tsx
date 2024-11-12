import React from "react";

import * as S from "./Loader.styled";



interface LoaderProps {

  text?: string;

}



const Loader = ({ text = "Loading..." }: LoaderProps) => {

  return (

    <S.LoaderContainer>

      <S.Spinner />

      <S.LoadingText>{text}</S.LoadingText>

    </S.LoaderContainer>

  );

};



export default Loader;
