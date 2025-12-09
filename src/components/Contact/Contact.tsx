import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ContactForm } from './ContactForm';
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
                    href="https://github.com/davidmcgregor"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.socialLink}
                    data-cursor="Visit"
                  >
                    GitHub
                  </a>
                  <a
                    href="https://linkedin.com/in/davidmcgregor"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.socialLink}
                    data-cursor="Visit"
                  >
                    LinkedIn
                  </a>
                  <a
                    href="https://twitter.com/davidmcgregor"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.socialLink}
                    data-cursor="Visit"
                  >
                    Twitter
                  </a>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Form Column */}
          <div className={styles.formColumn}>
            <ContactForm />
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
