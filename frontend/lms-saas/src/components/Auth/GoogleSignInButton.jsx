import { useEffect, useRef, useState } from "react";
import "./GoogleSignInButton.css";

const GIS_SCRIPT_URL = "https://accounts.google.com/gsi/client";

export default function GoogleSignInButton({ onCredential, disabled = false }) {
  const mountRef = useRef(null);
  const callbackRef = useRef(onCredential);
  const [status, setStatus] = useState("loading");
  const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

  useEffect(() => { callbackRef.current = onCredential; }, [onCredential]);

  useEffect(() => {
    if (!clientId) {
      setStatus("unconfigured");
      return undefined;
    }

    let active = true;
    const renderButton = () => {
      if (!active || !mountRef.current || !window.google?.accounts?.id) return;
      window.google.accounts.id.initialize({
        client_id: clientId,
        callback: (response) => {
          if (response.credential) callbackRef.current(response.credential);
        },
        cancel_on_tap_outside: true,
      });
      mountRef.current.replaceChildren();
      window.google.accounts.id.renderButton(mountRef.current, {
        type: "standard",
        theme: "outline",
        size: "large",
        text: "continue_with",
        shape: "rectangular",
        logo_alignment: "left",
        width: Math.min(mountRef.current.clientWidth || 360, 400),
      });
      setStatus("ready");
    };

    let script = document.querySelector(`script[src="${GIS_SCRIPT_URL}"]`);
    if (window.google?.accounts?.id) {
      renderButton();
    } else {
      if (!script) {
        script = document.createElement("script");
        script.src = GIS_SCRIPT_URL;
        script.async = true;
        script.defer = true;
        document.head.appendChild(script);
      }
      script.addEventListener("load", renderButton);
      script.addEventListener("error", () => active && setStatus("unavailable"), { once: true });
    }

    return () => {
      active = false;
      script?.removeEventListener("load", renderButton);
      mountRef.current?.replaceChildren();
    };
  }, [clientId]);

  return (
    <div className={`google-signin ${disabled ? "google-signin--disabled" : ""}`}>
      <div ref={mountRef} className="google-signin__mount" style={{ display: status === "ready" ? "flex" : "none" }} />
      {status !== "ready" && (
        <button className="google-signin__fallback" type="button" disabled>
          <span className="google-signin__g" aria-hidden="true">G</span>
          {status === "unconfigured" ? "Google sign-in needs setup" : status === "unavailable" ? "Google sign-in unavailable" : "Loading Google sign-in…"}
        </button>
      )}
      {status === "unconfigured" && <small>Add VITE_GOOGLE_CLIENT_ID to the frontend environment to enable Google sign-in.</small>}
    </div>
  );
}
