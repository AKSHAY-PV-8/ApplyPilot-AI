"use client";
import { useState } from "react";
import { AuthLayout } from "./AuthLayout";
import { AuthFormHeader } from "./AuthFormHeader";
import { PasswordStrengthMeter } from "./PasswordStrengthMeter";
import { SuccessScreen } from "./SuccessScreen";
import { FormInput } from "@/components/ui/FormInput";
import { Button } from "@/components/ui/Button";
import { ErrorMessage } from "@/components/ui/ErrorMessage";
import { GoogleAuthButton } from "@/components/ui/GoogleAuthButton";
import { Divider } from "@/components/ui/Divider";
import { UserIcon, MailIcon, LockIcon, EyeIcon, EyeOffIcon, CheckIcon } from "@/components/icons";
import { useRegisterForm } from "../hooks/useRegisterForm";
import styles from "./RegisterForm.module.css";

const BENEFITS = [
  { title: "AI-Tailored Resume", desc: "Match your resume to every job description automatically." },
  { title: "Smart Cover Letters", desc: "Compelling, personalised letters in seconds." },
  { title: "Application Tracker", desc: "Never lose track of where you applied." },
  { title: "Interview Coach", desc: "Practice with AI, walk in confident." },
];

export function RegisterForm() {
  const { form, updateField, loading, error, success, handleSubmit } = useRegisterForm();
  const [showPassword, setShowPassword] = useState(false);

  if (success) return <SuccessScreen />;

  return (
    <AuthLayout
      leftPanel={
        <div className={styles.leftBody}>
          <h1 className={styles.headline}>
            Start your journey to<br />
            <em>getting hired</em>
          </h1>
          <div className={styles.benefitList}>
            {BENEFITS.map((b) => (
              <div className={styles.benefitItem} key={b.title}>
                <div className={styles.benefitCheck}>
                  <CheckIcon />
                </div>
                <div>
                  <div className={styles.benefitTitle}>{b.title}</div>
                  <div className={styles.benefitDesc}>{b.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      }
    >
      <AuthFormHeader
        eyebrow="Create account"
        title="Join ApplyPilot AI"
        subtitleText="Already have an account?"
        subtitleLinkText="Sign in here"
        subtitleLinkHref="/login"
      />

      {error && <ErrorMessage>{error}</ErrorMessage>}

      <form onSubmit={handleSubmit}>
        <FormInput
          id="name" label="Full name" icon={<UserIcon />} type="text"
          placeholder="Your full name" value={form.name}
          onChange={(e) => updateField("name", e.target.value)}
          required autoComplete="name"
        />

        <FormInput
          id="email" label="Email address" icon={<MailIcon />} type="email"
          placeholder="you@example.com" value={form.email}
          onChange={(e) => updateField("email", e.target.value)}
          required autoComplete="email"
        />

        <FormInput
          id="password" label="Password" icon={<LockIcon />}
          type={showPassword ? "text" : "password"}
          placeholder="Create a strong password" value={form.password}
          onChange={(e) => updateField("password", e.target.value)}
          required autoComplete="new-password"
          rightElement={
            <button type="button" onClick={() => setShowPassword((v) => !v)} aria-label={showPassword ? "Hide password" : "Show password"}>
              {showPassword ? <EyeOffIcon /> : <EyeIcon />}
            </button>
          }
        />
        <PasswordStrengthMeter password={form.password} />

        <p className={styles.terms}>
          By creating an account, you agree to our <a href="/terms">Terms of Service</a> and{" "}
          <a href="/privacy">Privacy Policy</a>.
        </p>

        <Button type="submit" fullWidth loading={loading}>
          {loading ? "Creating account…" : "Create my free account →"}
        </Button>
      </form>

      <Divider>or sign up with</Divider>
      <GoogleAuthButton />

      <p className={styles.loginLink}>
        Already have an account? <a href="/login">Sign in</a>
      </p>
    </AuthLayout>
  );
}