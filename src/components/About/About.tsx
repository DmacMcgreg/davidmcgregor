import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { RevealText, MagneticButton, ParallaxShape } from '../shared';
import styles from './About.module.css';

const skills = [
  { category: 'Development', items: ['React', 'TypeScript', 'Node.js', 'Next.js', 'Python'] },
  { category: 'Design', items: ['Figma', 'UI/UX', 'Motion Design', 'Branding'] },
  { category: 'Tools', items: ['Git', 'Docker', 'AWS', 'Framer'] },
];

export function About() {
  const containerRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], [100, -100]);

  return (
    <section ref={containerRef} id="about" className={styles.about}>
      {/* Floating Shapes */}
      <div className={styles.shapes}>
        <ParallaxShape
          type="ring"
          size={200}
          color="var(--accent)"
          speed={0.3}
          top="10%"
          right="5%"
          opacity={0.5}
        />
        <ParallaxShape
          type="circle"
          size={60}
          color="var(--accent-alt)"
          speed={0.5}
          bottom="20%"
          left="10%"
          opacity={0.3}
        />
      </div>

      <div className={styles.container}>
        <div className={styles.grid}>
          {/* Image Column */}
          <motion.div className={styles.imageColumn} style={{ y: imageY }}>
            <div className={styles.imageWrapper}>
              <div className={styles.imagePlaceholder}>
                <span className={styles.imageInitials}>DM</span>
              </div>
              {/* Decorative frame */}
              <div className={styles.imageFrame} />
            </div>
          </motion.div>

          {/* Content Column */}
          <div className={styles.contentColumn}>
            <RevealText>
              <span className={styles.label}>About Me</span>
            </RevealText>

            <RevealText delay={0.1}>
              <h2 className={styles.title}>
                Crafting digital experiences with purpose and passion
              </h2>
            </RevealText>

            <RevealText delay={0.2}>
              <p className={styles.bio}>
                I'm a creative developer based in [Location], specializing in building
                exceptional digital experiences. With a background in both design and
                engineering, I bridge the gap between aesthetics and functionality.
              </p>
            </RevealText>

            <RevealText delay={0.3}>
              <p className={styles.bio}>
                My approach combines technical precision with creative exploration,
                resulting in products that not only work flawlessly but also
                create meaningful connections with users.
              </p>
            </RevealText>

            {/* Skills */}
            <motion.div
              className={styles.skills}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              {skills.map((skillGroup) => (
                <div key={skillGroup.category} className={styles.skillGroup}>
                  <h4 className={styles.skillCategory}>{skillGroup.category}</h4>
                  <ul className={styles.skillList}>
                    {skillGroup.items.map((skill) => (
                      <li key={skill} className={styles.skillItem}>
                        {skill}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              <MagneticButton
                href="/resume.pdf"
                variant="secondary"
                cursorText="Download"
              >
                Download Resume
              </MagneticButton>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
