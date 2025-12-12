import { motion } from 'framer-motion';
import { MagneticButton, RevealText } from '../shared';
import styles from './Footer.module.css';

const socialLinks = [
  { href: 'https://github.com/DmacMcgreg/davidmcgregor', label: 'GitHub', cursorText: 'This page is open source!' },
  { href: 'https://linkedin.com/in/david-mcgregor-canada/', label: 'LinkedIn', cursorText: 'Contact me' },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        {/* CTA Section */}
        <div className={styles.cta}>
          <RevealText>
            <h2 className={styles.ctaTitle}>Let's work together</h2>
          </RevealText>
          <RevealText delay={0.1}>
            <p className={styles.ctaText}>
              Have a project in mind? Let's create something amazing.
            </p>
          </RevealText>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <MagneticButton
              href="mailto:hello@davidmcgregor.com"
              variant="primary"
              size="lg"
              cursorText="Email"
            >
              Get in touch
            </MagneticButton>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <div className={styles.bottom}>
          <div className={styles.copyright}>
            <span>&copy; {currentYear} David McGregor</span>
          </div>

          <nav className={styles.socialLinks}>
            {socialLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialLink}
                data-cursor={link.cursorText}
              >
                {link.label}
              </a>
            ))}
          </nav>

          <button
            type="button"
            onClick={scrollToTop}
            className={styles.backToTop}
            data-cursor="Top"
          >
            Back to top
          </button>
        </div>
      </div>

      {/* Large Background Text */}
      <div className={styles.backgroundText} aria-hidden="true">
        <span>DM</span>
      </div>
    </footer>
  );
}
