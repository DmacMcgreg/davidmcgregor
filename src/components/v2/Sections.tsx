import { useEffect, useState } from 'react';
import { MagneticButton, ParallaxShape, Reveal, StaggerText } from './Primitives';
import { ShaderAurora, ShaderField, ShaderHero, type ShaderIntensity } from './Shaders';

interface ShaderSectionProps {
  shaderIntensity?: ShaderIntensity;
}

function useTorontoTime() {
  const [timeStr, setTimeStr] = useState(() =>
    new Date().toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
      timeZone: 'America/Toronto',
    })
  );
  useEffect(() => {
    const id = window.setInterval(() => {
      setTimeStr(
        new Date().toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
          hour12: false,
          timeZone: 'America/Toronto',
        })
      );
    }, 30000);
    return () => window.clearInterval(id);
  }, []);
  return timeStr;
}

export function V2Hero({ shaderIntensity = 'high' }: ShaderSectionProps) {
  const timeStr = useTorontoTime();

  return (
    <section className="hero" id="top">
      <div className="hero__shader">
        <ShaderHero intensity={shaderIntensity} />
      </div>
      <div className="hero__vignette" />

      <div className="hero__meta">
        <div className="hero__meta-row">
          <span className="hero__meta-label">Portfolio</span>
          <span>/ v2 · mmxxvi</span>
        </div>
        <div className="hero__meta-row">
          <span className="hero__meta-label">Location</span>
          <span>43.65°N · Toronto</span>
        </div>
      </div>

      <div className="container hero__content">
        <h1 className="hero__title">
          <div className="hero__title-row">
            <StaggerText text="David" className="hero__first" stagger={50} />
          </div>
          <div className="hero__title-row">
            <StaggerText text="McGregor" className="hero__last" delay={200} stagger={50} />
          </div>
        </h1>

        <div className="hero__bottom">
          <Reveal delay={900}>
            <p className="hero__lead">
              AI Solutions Engineer who <strong>ships</strong>. I design multi-agent systems,
              lead engineering teams, and translate what's possible with AI into software that
              works in production.
            </p>
          </Reveal>
          <Reveal delay={1100}>
            <div className="hero__cta-group">
              <MagneticButton href="#work" variant="primary" cursorLabel="View Work">
                Selected Work
              </MagneticButton>
              <MagneticButton href="#contact" variant="ghost" cursorLabel="Say hi">
                Get in touch
              </MagneticButton>
            </div>
          </Reveal>
        </div>
      </div>

      <div className="hero__scroll">
        <span>Scroll</span>
        <div className="hero__scroll-line">
          <div className="hero__scroll-dot" />
        </div>
        <span style={{ color: 'var(--gold)' }}>{timeStr}</span>
      </div>
    </section>
  );
}

const TICKER_ITEMS = [
  'Agent Workflows',
  'Context Engineering',
  'Multi-Agent Systems',
  'Durable Execution',
  'RAG & Evals',
  'Technical Architecture',
  'Team Leadership',
];

export function V2Ticker() {
  return (
    <div className="ticker" aria-hidden="true">
      <div className="ticker__track">
        {[...TICKER_ITEMS, ...TICKER_ITEMS, ...TICKER_ITEMS].map((t, i) => (
          <span key={i} className="ticker__item">
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}

const SKILLS: { category: string; items: string[] }[] = [
  {
    category: 'AI & LLMs',
    items: [
      'Claude',
      'GPT',
      'Gemini',
      'Agent Skills',
      'MCP',
      'Agentic Memory',
      'Context Engineering',
      'Agentic Loops',
      'Durable Workflows',
      'RAG',
      'Vector DBs',
      'Evals',
    ],
  },
  { category: 'AI Coding', items: ['Claude Code', 'Codex', 'Cursor', 'Spec-Driven Dev'] },
  {
    category: 'Model Training',
    items: ['LLM Fine-Tuning', 'SFT', 'RLVR', 'Reward Modeling'],
  },
  {
    category: 'Languages & Frameworks',
    items: ['TypeScript', 'React', 'Node.js', 'Python', 'Vite', 'Next.js'],
  },
  {
    category: 'Infra & Tools',
    items: ['Docker', 'Git', 'CI/CD', 'Cloud Deploy', 'API Design'],
  },
  {
    category: 'Leadership',
    items: ['Team Management', 'Technical Architecture', 'Spec Writing', 'Stakeholder Comms'],
  },
];

export function V2About() {
  return (
    <section className="about" id="about">
      <div className="container">
        <div className="about__grid">
          <div>
            <Reveal>
              <div className="about__portrait">
                <img
                  className="about__portrait-image"
                  src="/images/profile-photo.jpg"
                  alt="David McGregor"
                />
                <div className="about__portrait-meta">
                  <span>David McGregor</span>
                  <span>01/01</span>
                </div>
              </div>
            </Reveal>
          </div>
          <div>
            <Reveal>
              <span className="label">02 — About</span>
            </Reveal>
            <Reveal delay={100}>
              <h2 className="about__heading">
                I build AI systems <em>&amp;</em> lead the teams that ship them.
              </h2>
            </Reveal>
            <Reveal delay={200}>
              <p className="about__bio">
                I'm <strong>David McGregor</strong>, an AI Solutions Engineer based in Toronto.
                I architect multi-agent workflows, write technical specifications, and build
                infrastructure that scales.
              </p>
            </Reveal>
            <Reveal delay={300}>
              <p className="about__bio">
                My background spans healthcare tech, enterprise applications, and AI-powered
                tools — but my focus now is on what's next. I work daily with Claude Code,
                Cursor, and modern tooling, shipping production systems while helping teams
                understand what's actually possible today.
              </p>
            </Reveal>
            <Reveal delay={400}>
              <p className="about__bio">
                What sets me apart isn't just technical depth. I enjoy explaining complex ideas,
                helping teams adopt new approaches, and bridging the gap between what AI can do
                and what your organization needs.
              </p>
            </Reveal>
            <Reveal delay={500}>
              <div className="about__skills">
                {SKILLS.map((g) => (
                  <div key={g.category} className="about__skill-group">
                    <h4>{g.category}</h4>
                    <ul className="about__skill-list">
                      {g.items.map((s) => (
                        <li key={s}>{s}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

const PILLARS = [
  {
    title: 'Agent Workflows',
    desc: 'Agentic loops, durable workflows, MCP tools, and multi-agent systems that reason and act autonomously.',
  },
  {
    title: 'Context Engineering',
    desc: "Shaping LLM behavior through rules, prompts, hooks, and system instructions. Designing the context that makes AI reliable.",
  },
  {
    title: 'AI Development',
    desc: 'Daily coding with Claude Code, Cursor, and modern tooling. Writing specs LLMs can execute. Staying on the forefront.',
  },
  {
    title: 'Evals & Infrastructure',
    desc: 'Testing RAG pipelines, measuring LLM performance, building evals that catch regressions before production.',
  },
];

export function V2Pillars({ shaderIntensity = 'high' }: ShaderSectionProps) {
  return (
    <section className="pillars" id="ai">
      <div className="pillars__shader" aria-hidden="true">
        <ShaderField intensity={shaderIntensity} />
      </div>
      <ParallaxShape
        type="ring"
        size={220}
        color="var(--gold)"
        speed={0.3}
        top="8%"
        right="6%"
        opacity={0.18}
      />
      <ParallaxShape
        type="disc"
        size={12}
        color="var(--gold)"
        speed={0.6}
        top="40%"
        left="3%"
        opacity={0.6}
      />
      <ParallaxShape
        type="ring"
        size={80}
        color="var(--silver-blue)"
        speed={0.4}
        bottom="18%"
        right="12%"
        opacity={0.3}
      />

      <div className="container">
        <div className="pillars__intro">
          <Reveal>
            <span className="label">03 — Practice</span>
          </Reveal>
          <Reveal delay={100}>
            <h2 className="pillars__title">
              Four disciplines <em>I live in</em> every day.
            </h2>
          </Reveal>
        </div>

        <div className="pillars__grid">
          {PILLARS.map((p, i) => (
            <Reveal key={p.title} delay={i * 100} className="pillar">
              <div className="pillar__accent" />
              <div>
                <div className="pillar__index">0{i + 1} / 04</div>
                <h3 className="pillar__title">{p.title}</h3>
              </div>
              <p className="pillar__desc">{p.desc}</p>
            </Reveal>
          ))}
        </div>

      </div>
    </section>
  );
}

export function V2Contact({ shaderIntensity = 'high' }: ShaderSectionProps) {
  return (
    <section className="contact" id="contact">
      <div className="contact__shader" aria-hidden="true">
        <ShaderAurora intensity={shaderIntensity} />
      </div>
      <div className="contact__mark" aria-hidden="true">
        d
      </div>
      <div className="container contact__inner">
        <Reveal>
          <span className="label">04 — Contact</span>
        </Reveal>
        <Reveal delay={100}>
          <h2 className="contact__title">
            Let's build something <em>worth shipping.</em>
          </h2>
        </Reveal>
        <Reveal delay={200}>
          <a
            href="mailto:hello@davidmcgregor.site"
            className="contact__email"
            data-cursor-label="Email"
          >
            <span>hello@davidmcgregor.site</span>
            <span className="contact__email-arrow">↗</span>
          </a>
        </Reveal>
        <Reveal delay={300}>
          <div className="contact__grid">
            <div>
              <div className="contact__card-label">Based in</div>
              <div className="contact__card-value">Toronto, Canada</div>
            </div>
            <div>
              <div className="contact__card-label">Timezone</div>
              <div className="contact__card-value">UTC−5 / Eastern</div>
            </div>
            <div>
              <div className="contact__card-label">Open to</div>
              <div className="contact__card-value">Engineering · Advisory · Speaking</div>
            </div>
            <div>
              <div className="contact__card-label">Elsewhere</div>
              <div className="contact__card-value">
                <a href="https://github.com/DmacMcgreg" data-cursor-label="GitHub">
                  GitHub
                </a>{' '}
                ·{' '}
                <a href="https://www.linkedin.com/" data-cursor-label="LinkedIn">
                  LinkedIn
                </a>{' '}
                ·{' '}
                <a href="https://x.com/" data-cursor-label="X">
                  X
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
