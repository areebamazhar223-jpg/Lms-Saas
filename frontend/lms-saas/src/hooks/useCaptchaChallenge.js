import { useCallback, useEffect, useState } from "react";
import api from "../services/api";

export default function useCaptchaChallenge(purpose, enabled = true) {
  const [challenge, setChallenge] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const refresh = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const { data } = await api.get("/auth/captcha", { params: { purpose } });
      setChallenge(data);
      return data;
    } catch (requestError) {
      setChallenge(null);
      setError(requestError.response?.data?.message || "Could not load the security check.");
      return null;
    } finally {
      setLoading(false);
    }
  }, [purpose]);

  useEffect(() => {
    if (enabled) refresh();
    else setChallenge(null);
  }, [enabled, refresh]);
  return { challenge, loading, error, refresh };
}
