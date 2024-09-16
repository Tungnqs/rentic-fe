import { useCallback, useEffect, useMemo } from "react";
import { useSelector } from "react-redux";
import { selectUserRole } from "../store/slices/auth.slice";
import { useNavigate } from "react-router";

export function useAppRole() {
  const userRole = useSelector(selectUserRole);
  const navigate = useNavigate();
  const checkUserRole = useCallback(() => {
    if (userRole === "LANDLORD") {
      navigate("/properties");
    }else{
      navigate("/");
    }
  }, [navigate, userRole]);

  return useMemo(
    () => ({
      checkUserRole,
    }),
    [checkUserRole]
  );
}
