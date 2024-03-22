import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export function useAuthRedirect(error) {
  const navigate = useNavigate();

  useEffect(() => {
    if (error?.status === 401) {
      navigate("/login");
    }
  }, [error, navigate]);
}