"use client";
import { useState } from "react";
import { registerUser } from "@/services/authApi";

interface RegisterFormState {
  name: string;
  email: string;
  password: string;
}

export function useRegisterForm() {
  const [form, setForm] = useState<RegisterFormState>({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const updateField = (field: keyof RegisterFormState, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await registerUser(form);
      setSuccess(true);
    } catch {
      setError("Registration failed. Please check your details and try again.");
    } finally {
      setLoading(false);
    }
  };

  return { form, updateField, loading, error, success, handleSubmit };
}