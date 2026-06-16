import { InputHTMLAttributes, ReactNode } from "react";
import styles from "./FormInput.module.css";

interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  icon: ReactNode;
  rightElement?: ReactNode;
  labelAction?: ReactNode;
}

export function FormInput({ id, label, icon, rightElement, labelAction, ...rest }: FormInputProps) {
  return (
    <div className={styles.group}>
      <div className={styles.labelRow}>
        <label className={styles.label} htmlFor={id}>{label}</label>
        {labelAction}
      </div>
      <div className={styles.wrap}>
        <span className={styles.icon}>{icon}</span>
        <input id={id} className={styles.input} {...rest} />
        {rightElement && <span className={styles.iconRight}>{rightElement}</span>}
      </div>
    </div>
  );
}