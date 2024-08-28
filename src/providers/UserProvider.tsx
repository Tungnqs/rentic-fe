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
  const userRole = useSelector(selectUserProfile).userProfile.roles[0];
  const isLogin = useSelector(selectIsLogin);
  const dispatch = useDispatch<AppDispatch>();
  const token = getCookie("token");
  const navigate = useNavigate();

  useEffect(() => {
    const refetchUserData = async () => {
      if (!token) {
        navigate("/login");
      } else if (token && !userRole) {
        const getProfileResult = await dispatch(getUserProfile());
        const isSetUserProfile = getUserProfile.fulfilled.match(getProfileResult);
        dispatch(setIsLoggedIn(true));
        if (isSetUserProfile) {
          navigate("/");
        } else {
          navigate("/login");
        }
      }
    };
    refetchUserData();
  }, [userRole, token]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    Promise.all([]).then(() => setLoading(false));
  }, [dispatch]);

  return loading ? <Loader /> : children;
}
