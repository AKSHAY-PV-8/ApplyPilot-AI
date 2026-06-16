export interface PasswordStrength {
  score: 0 | 1 | 2 | 3 | 4;
  label: string;
  color: string;
}

const LABELS = ["", "Weak", "Fair", "Good", "Strong"];
const COLORS = ["", "#EF4444", "#F59E0B", "#10B981", "#4F46E5"];

export function getPasswordStrength(password: string): PasswordStrength {
  if (!password) return { score: 0, label: "", color: "" };

  let score = 0;
  if (password.length >= 8) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

  return { score: score as PasswordStrength["score"], label: LABELS[score], color: COLORS[score] };
}