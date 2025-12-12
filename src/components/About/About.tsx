import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { RevealText, ParallaxShape } from '../shared';
import styles from './About.module.css';

const skills = [
  { category: 'AI & LLMs', items: ['Claude', 'GPT', 'Gemini', 'Context Engineering', 'Agentic Loops', 'Durable Workflows', 'MCP Tools', 'RAG', 'Vector Databases', 'Evals'] },
  { category: 'Languages & Frameworks', items: ['TypeScript', 'React', 'Node.js', 'Python', 'Vite', 'Next.js'] },
  { category: 'Infrastructure & Tools', items: ['Docker', 'Git', 'CI/CD', 'Cloud Deployment', 'API Design'] },
  { category: 'Leadership', items: ['Team Management', 'Technical Architecture', 'Specification Writing', 'Stakeholder Communication'] },
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
                I build AI systems and lead the teams that ship them.
              </h2>
            </RevealText>

            <RevealText delay={0.2}>
              <p className={styles.bio}>
                I'm David McGregor, an AI Solutions Engineer who builds AI systems and leads the teams that ship them.
              </p>
            </RevealText>

            <RevealText delay={0.3}>
              <p className={styles.bio}>
                I've spent years at the intersection of engineering and leadership: architecting multi-agent workflows, writing technical specifications, and building infrastructure that scales. My background spans healthcare tech, enterprise applications, and AI-powered tools, but my focus now is on what's next.
              </p>
            </RevealText>

            <RevealText delay={0.4}>
              <p className={styles.bio}>
                What sets me apart isn't just technical depth. I genuinely enjoy explaining complex ideas, helping teams understand new approaches, and bridging the gap between what AI can do and what your organization needs. I'm patient, clear, and confident, whether I'm writing code, leading a project, or talking through architecture decisions.
              </p>
            </RevealText>

            {/* Skills */}
            <motion.div
              className={styles.skills}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.8 }}
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

            {/* <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6, duration: 0.6 }}
            >
              <MagneticButton
                href="/resume.pdf"
                variant="secondary"
                cursorText="Download"
              >
                Download Resume
              </MagneticButton>
            </motion.div> */}
          </div>
        </div>
      </div>
    </section>
  );
}
