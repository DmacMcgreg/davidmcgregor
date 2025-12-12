import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { RevealText, ParallaxShape } from '../shared';
import styles from './Contact.module.css';

export function Contact() {
  const containerRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);

  return (
    <section ref={containerRef} id="contact" className={styles.contact}>
      {/* Background shapes */}
      <motion.div className={styles.background} style={{ y: backgroundY }}>
        <ParallaxShape
          type="circle"
          size={400}
          color="var(--accent)"
          speed={0.2}
          top="-10%"
          right="-10%"
          opacity={0.05}
          blur={60}
        />
        <ParallaxShape
          type="blob"
          size={500}
          color="var(--accent-alt)"
          speed={0.3}
          bottom="-20%"
          left="-10%"
          opacity={0.03}
          blur={80}
        />
      </motion.div>

      <div className={styles.container}>
        <div className={styles.grid}>
          {/* Info Column */}
          <div className={styles.infoColumn}>
            <RevealText>
              <span className={styles.label}>Get in Touch</span>
            </RevealText>

            <RevealText delay={0.1}>
              <h2 className={styles.title}>
                Let's create something extraordinary together
              </h2>
            </RevealText>

            <RevealText delay={0.2}>
              <p className={styles.description}>
                Have a project in mind or just want to chat? I'm always excited
                to connect with fellow creators and collaborate on meaningful work.
              </p>
            </RevealText>

            {/* Contact Info */}
            <motion.div
              className={styles.contactInfo}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>Email</span>
                <a
                  href="mailto:hello@davidmcgregor.com"
                  className={styles.infoValue}
                  data-cursor="Copy"
                >
                  hello@davidmcgregor.com
                </a>
              </div>

              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>Location</span>
                <span className={styles.infoValue}>Available Worldwide</span>
              </div>

              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>Social</span>
                <div className={styles.socialLinks}>
                  <a
                    href="https://github.com/DmacMcgreg/davidmcgregor"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.socialLink}
                    data-cursor="Visit"
                  >
                    GitHub
                  </a>
                  <a
                    href="https://linkedin.com/in/david-mcgregor-canada/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.socialLink}
                    data-cursor="Visit"
                  >
                    LinkedIn
                  </a>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Coming Soon Column */}
          <div className={styles.formColumn}>
            <motion.div
              className={styles.comingSoon}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <span className={styles.comingSoonLabel}>Coming Soon</span>
              <h3 className={styles.comingSoonTitle}>Contact form under construction</h3>
              <p className={styles.comingSoonText}>
                In the meantime, feel free to reach out on LinkedIn.
              </p>
              <a
                href="https://linkedin.com/in/david-mcgregor-canada/"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.linkedinButton}
                data-cursor="Visit"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
                Connect on LinkedIn
              </a>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Large decorative text */}
      <div className={styles.decorativeText} aria-hidden="true">
        <span>Say Hello</span>
      </div>
    </section>
  );
}
