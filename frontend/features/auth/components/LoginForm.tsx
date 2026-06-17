"use client";
import { AuthLayout } from "./AuthLayout";
import { AuthFormHeader } from "./AuthFormHeader";
import { FormInput } from "@/components/ui/FormInput";
import { Button } from "@/components/ui/Button";
import { ErrorMessage } from "@/components/ui/ErrorMessage";
import { GoogleAuthButton } from "@/components/ui/GoogleAuthButton";
import { Divider } from "@/components/ui/Divider";
import { MailIcon, LockIcon } from "@/components/icons";
import { useLoginForm } from "../hooks/useLoginForm";
import styles from "./LoginForm.module.css";

export function LoginForm() {
  const { form, updateField, loading, error, handleSubmit } = useLoginForm();

  return (
    <AuthLayout
      leftPanel={
        <div className={styles.leftBody}>
          <div className={styles.bodyContent}>
            <h1 className={styles.headline}>
              Your next job starts with a<br />
              <em>smarter</em> application.
            </h1>
            <p className={styles.desc}>
              ApplyPilot AI crafts tailored resumes and cover letters, tracks your applications, and
              prepares you for every interview — all in one place.
            </p>
          </div>
        </div>
      }
    >
      <AuthFormHeader
        eyebrow="Welcome back"
        title="Sign in to ApplyPilot"
        subtitleText="Don't have an account?"
        subtitleLinkText="Create one free"
        subtitleLinkHref="/register"
      />

      {error && <ErrorMessage>{error}</ErrorMessage>}

      <form onSubmit={handleSubmit}>
        <FormInput
          id="email" label="Email address" icon={<MailIcon />} type="email"
          placeholder="you@example.com" value={form.email}
          onChange={(e) => updateField("email", e.target.value)}
          required autoComplete="email"
        />

        <FormInput
          id="password" label="Password" icon={<LockIcon />} type="password"
          placeholder="••••••••" value={form.password}
          onChange={(e) => updateField("password", e.target.value)}
          required autoComplete="current-password"
          labelAction={<a href="/forgot-password" className={styles.forgotLink}>Forgot password?</a>}
        />

        <Button type="submit" fullWidth loading={loading}>
          {loading ? "Signing in…" : "Sign in →"}
        </Button>
      </form>

      <Divider>or continue with</Divider>
      <GoogleAuthButton />

      <p className={styles.registerLink}>
        New to ApplyPilot? <a href="/register">Create a free account</a>
      </p>
    </AuthLayout>
  );
}