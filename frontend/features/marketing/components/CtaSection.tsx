import { Button } from "@/components/ui/Button";
import styles from "./CtaSection.module.css";
export function CtaSection() {

    return (

        <section className={styles.section}>

            <div className={styles.title}>Ready to land your dream job?</div>
            <p className={styles.desc}>
                Join thousands of candidates who are applying smarter and getting hired faster with ApplyPilot AI.
            </p>
            <Button href="/dashboard" variant="white" size="lg">Get started — it&apos;s free</Button>

        </section>

    );

}