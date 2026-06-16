import { ButtonHTMLAttributes, ReactNode } from "react";
import styles from "./Button.module.css";
import Link from "next/link";

type Variant = "primary" | "ghost" | "outline" | "white" ;
type Size = "sm" | "md" | "lg" ;

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>{
    variant?: Variant;
    size?: Size;
    href?: string;
    loading? : boolean;
    fullWidth? : boolean;
    children : ReactNode;
}

export function Button({
    variant = "primary",
    size = "sm",
    href,
    loading,
    fullWidth,
    className,
    children,
    disabled,
    ...rest
}: ButtonProps){

    const classes = [styles.btn, styles[variant], styles[size], fullWidth ? styles.fullWidth : "", className ?? ""].join(" ");

    if(href) {
        return (
            <Link href={href} className={className}>
                {children}
            </Link>
        )
    }
    return (
        <button className={classes} disabled={disabled || loading} {...rest}>
            {children}
        </button>
    )
}