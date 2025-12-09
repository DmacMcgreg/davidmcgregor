import { useTheme } from '../../context/ThemeContext';
import styles from './ThemeToggle.module.css';

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      className={styles.toggle}
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === 'sovereign' ? 'Neural Lux' : 'Sovereign'} theme`}
      title={`Current: ${theme === 'sovereign' ? 'Sovereign' : 'Neural Lux'}`}
    >
      <span className={styles.iconWrapper}>
        {theme === 'sovereign' ? (
          <SovereignIcon className={styles.icon} />
        ) : (
          <NeuralLuxIcon className={styles.icon} />
        )}
      </span>
    </button>
  );
}

function SovereignIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* Crown/crest icon for Sovereign */}
      <path d="M2 17l3-6 4 3 3-9 3 9 4-3 3 6" />
      <path d="M2 17h20v3H2z" />
    </svg>
  );
}

function NeuralLuxIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* Circuit/neural network icon for Neural Lux */}
      <circle cx="12" cy="12" r="3" />
      <circle cx="4" cy="6" r="2" />
      <circle cx="20" cy="6" r="2" />
      <circle cx="4" cy="18" r="2" />
      <circle cx="20" cy="18" r="2" />
      <path d="M9.5 10L6 8" />
      <path d="M14.5 10l3.5-2" />
      <path d="M9.5 14L6 16" />
      <path d="M14.5 14l3.5 2" />
    </svg>
  );
}
