import React, { useState } from "react";
import styles from "./LoginForm.module.scss";
import { Button } from "../../atoms/Button/Button";
import { InputControl } from "../../atoms/Input/Input";

export interface LoginFormProps {
  onSubmit?: (data: { identifier: string; password: string }) => void;
  error?: string;
  loading?: boolean;
  title?: string;
  subtitle?: string;
  submitLabel?: string;
  identifierLabel?: string;
  passwordLabel?: string;
  className?: string;
}

export const LoginForm: React.FC<LoginFormProps> = ({
  onSubmit,
  error,
  loading = false,
  title = "// access terminal",
  subtitle = "authenticate to continue",
  submitLabel = "connect",
  identifierLabel = "identifier",
  passwordLabel = "passphrase",
  className,
}) => {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit?.({ identifier, password });
  };

  return (
    <div className={[styles.card, className ?? ""].filter(Boolean).join(" ")}>
      <div className={styles.leds}>
        <span className={styles.led1} />
        <span className={styles.led2} />
        <span className={styles.led3} />
      </div>

      <h2 className={styles.title}>{title}</h2>
      <p className={styles.subtitle}>{subtitle}</p>

      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.field}>
          <span className={styles.label}>{identifierLabel}</span>
          <InputControl
            prompt=">>"
            aria-invalid={!!error || undefined}
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
          />
        </div>

        <div className={styles.field}>
          <span className={styles.label}>{passwordLabel}</span>
          <InputControl
            prompt=">>"
            aria-invalid={!!error || undefined}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            {...{ type: "password" }}
          />
        </div>

        {error && <p className={styles.error} role="alert">[!] {error}</p>}

        <Button
          variant="primary"
          size="md"
          type="submit"
          disabled={loading}
          style={{ width: "100%", marginTop: "0.5rem" }}
        >
          {loading ? "connecting..." : submitLabel}
        </Button>
      </form>
    </div>
  );
};
