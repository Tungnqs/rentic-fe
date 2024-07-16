import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store";
import Loader from "../components/Loader/Loader";

interface IAppProvider {
  children: JSX.Element;
}

export default function UserProvider({ children }: IAppProvider) {
  const dispatch = useDispatch<AppDispatch>();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    Promise.all([]).then(
      () => setLoading(false),
    );
  }, [dispatch]);

  return loading ? <Loader /> : children;
}