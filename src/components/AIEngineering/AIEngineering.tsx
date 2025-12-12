import { motion } from 'framer-motion';
import { RevealText, ParallaxShape } from '../shared';
import styles from './AIEngineering.module.css';

const pillars = [
  {
    title: 'Agent Workflows',
    description: 'Agentic loops, durable workflows, MCP tools, and multi-agent systems that reason and act autonomously.',
  },
  {
    title: 'Context Engineering',
    description: 'The discipline of shaping LLM behavior through rules, prompts, hooks, and system instructions. Designing the context that makes AI reliable.',
  },
  {
    title: 'AI Development',
    description: 'Daily coding with Claude Code, Cursor, and modern tooling. Writing specs that LLMs can execute. Staying on the forefront of new models.',
  },
  {
    title: 'Evals & Infrastructure',
    description: 'Testing RAG pipelines, measuring LLM performance, building evals that catch regressions before production.',
  },
];

const tools = ['Claude', 'GPT', 'Gemini', 'LangChain', 'Vector Databases', 'RAG', 'MCP Servers', 'Durable Execution Frameworks'];

export function AIEngineering() {
  return (
    <section id="ai-engineering" className={styles.aiEngineering}>
      {/* Floating Shapes */}
      <div className={styles.shapes}>
        <ParallaxShape
          type="circle"
          size={120}
          color="var(--accent)"
          speed={0.4}
          top="15%"
          left="5%"
          opacity={0.4}
        />
        <ParallaxShape
          type="ring"
          size={180}
          color="var(--accent-alt)"
          speed={0.3}
          bottom="10%"
          right="8%"
          opacity={0.3}
        />
      </div>

      <div className={styles.container}>
        <RevealText>
          <span className={styles.label}>AI Engineering</span>
        </RevealText>

        <RevealText delay={0.1}>
          <h2 className={styles.title}>
            I design and build AI systems that actually ship, from agent architectures to production infrastructure.
          </h2>
        </RevealText>

        <div className={styles.pillarsGrid}>
          {pillars.map((pillar, index) => (
            <motion.div
              key={pillar.title}
              className={styles.pillarCard}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 + index * 0.1, duration: 0.6 }}
            >
              <h3 className={styles.pillarTitle}>{pillar.title}</h3>
              <p className={styles.pillarDescription}>{pillar.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          className={styles.toolsSection}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <h4 className={styles.toolsLabel}>Tools & Technologies</h4>
          <div className={styles.toolsList}>
            {tools.map((tool) => (
              <span key={tool} className={styles.toolTag}>
                {tool}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
