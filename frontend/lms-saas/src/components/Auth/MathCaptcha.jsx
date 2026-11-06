import { useEffect, useRef, useState } from "react";
import { Check, RefreshCw, ShieldCheck } from "lucide-react";
import useCaptchaChallenge from "../../hooks/useCaptchaChallenge";
import "./MathCaptcha.css";

export default function MathCaptcha({ purpose, onVerified, resetKey = 0, disabled = false }) {
  const [expanded, setExpanded] = useState(false);
  const { challenge, loading, error: loadError, refresh } = useCaptchaChallenge(purpose, expanded);
  const [answer, setAnswer] = useState("");
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState("");
  const onVerifiedRef = useRef(onVerified);

  useEffect(() => { onVerifiedRef.current = onVerified; }, [onVerified]);

  const refreshChallenge = async () => {
    setAnswer("");
    setVerified(false);
    setError("");
    onVerifiedRef.current(null);
    await refresh();
  };

  const handleToggle = (event) => {
    const shouldExpand = event.target.checked;
    setExpanded(shouldExpand);
    setAnswer("");
    setVerified(false);
    setError("");
    onVerifiedRef.current(null);
  };

  useEffect(() => {
    if (resetKey > 0) refreshChallenge();
  }, [resetKey]);

  const handleVerify = (event) => {
    event.preventDefault();
    if (!answer.trim()) {
      setError("Enter the answer to the question first.");
      return;
    }
    const values = challenge?.question?.match(/(\d+)\s*([×x*+])\s*(\d+)(?:\s*([+−-])\s*(\d+))?/i);
    if (!values) {
      setError("We couldn’t read this security question. Refresh it and try again.");
      return;
    }
    const firstStep = values[2] === "+" ? Number(values[1]) + Number(values[3]) : Number(values[1]) * Number(values[3]);
    const expectedAnswer = values[4]
      ? values[4] === "+" ? firstStep + Number(values[5]) : firstStep - Number(values[5])
      : firstStep;
    if (Number(answer) !== expectedAnswer) {
      setError("That answer isn’t correct. Try again or get a new question.");
      setVerified(false);
      onVerifiedRef.current(null);
      return;
    }
    setError("");
    setVerified(true);
    onVerifiedRef.current({ captchaId: challenge.captchaId, captchaAnswer: answer.trim() });
  };

  return (
    <section className={`math-captcha ${verified ? "math-captcha--verified" : ""}`} aria-label="Human verification">
      <label className="math-captcha__start">
        <input type="checkbox" checked={expanded} onChange={handleToggle} disabled={disabled} aria-label="I'm not a robot" />
        <span className="math-captcha__checkmark" aria-hidden="true">{expanded && <Check size={17} />}</span>
        <span className="math-captcha__start-copy"><strong>{verified ? "Verification complete" : "I’m not a robot"}</strong><small>{verified ? "Your account security check passed." : "Click here to complete a quick security check."}</small></span>
        <span className="math-captcha__brand"><ShieldCheck size={21} aria-hidden="true" /><small>LearnAxis<br />Security</small></span>
      </label>

      {expanded && <div className="math-captcha__challenge">
        <div className="math-captcha__heading">
          <div><h3>Prove you’re human</h3><p>Solve the math problem below to continue.</p></div>
          <button className="math-captcha__refresh" type="button" onClick={refreshChallenge} aria-label="Get a new CAPTCHA question" disabled={disabled || loading}>
            <RefreshCw size={17} aria-hidden="true" />
          </button>
        </div>
        <div className="math-captcha__problem" aria-live="polite" aria-busy={loading}>
          {loading ? <span className="math-captcha__loading">Loading question…</span> : challenge?.question ? (
            <span className="math-captcha__equation">{challenge.question.replace(/^What is\s*/i, "").replace(/\?$/, " = ?")}</span>
          ) : <span className="math-captcha__loading">Security check unavailable</span>}
        </div>
        <label className="math-captcha__label" htmlFor={`captcha-answer-${purpose}`}>Enter your answer</label>
        <input
          id={`captcha-answer-${purpose}`}
          className="math-captcha__input"
          type="number"
          inputMode="numeric"
          value={answer}
          onChange={(event) => { setAnswer(event.target.value); setError(""); setVerified(false); onVerifiedRef.current(null); }}
          placeholder="Your answer"
          disabled={disabled || loading || !challenge?.captchaId || verified}
          aria-invalid={Boolean(error || loadError)}
          aria-describedby={`captcha-message-${purpose}`}
        />
        <button className="math-captcha__verify" type="button" onClick={handleVerify} disabled={disabled || loading || !challenge?.captchaId || verified || !answer.trim()}>
          {verified ? <><Check size={18} aria-hidden="true" />Verified</> : "Verify"}
        </button>
        <div id={`captcha-message-${purpose}`} className={`math-captcha__message ${error || loadError ? "is-error" : verified ? "is-success" : ""}`} role={error || loadError ? "alert" : "status"}>
          {error || loadError || (verified ? "Security check passed. You can continue." : "")}
        </div>
      </div>}
    </section>
  );
}
