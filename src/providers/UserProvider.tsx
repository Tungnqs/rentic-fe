import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../store";
import Loader from "../components/Loader/Loader";
import { getCookie } from "../utils/cookies.utils";
import {
  getUserProfile,
  selectIsLogin,
  selectUserProfile,
  setIsLoggedIn,
} from "../store/slices/auth.slice";
import { useNavigate } from "react-router";

interface IAppProvider {
  children: JSX.Element;
}

export default function UserProvider({ children }: IAppProvider) {
  const userRole = useSelector(selectUserProfile).roles[0];
  const isLogin = useSelector(selectIsLogin);
  const dispatch = useDispatch<AppDispatch>();
  const token = getCookie("token");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const refetchUserData = async () => {
      try {
        if (token) {
          const getProfileResult = await dispatch(getUserProfile());
          const isSetUserProfile =
            getUserProfile.fulfilled.match(getProfileResult);
          setLoading(false);
          if (isSetUserProfile) {
            dispatch(setIsLoggedIn(true));
          }
        } else {
          setLoading(false);
        }
      } catch {
        setLoading(false);
        navigate("/page404");
      }
    };
    refetchUserData();
  }, [userRole, token]);

  return loading ? <Loader /> : children;
}
