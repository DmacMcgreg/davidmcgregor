import { Link } from 'react-router-dom';

export function V2Header() {
  return (
    <header className="site-header">
      <Link to="/" className="site-header__brand" data-cursor-label="Home">
        <svg
          className="site-header__logo"
          width="34"
          height="34"
          viewBox="0 0 34 34"
          aria-hidden="true"
        >
          <circle cx="17" cy="17" r="16" fill="none" stroke="currentColor" strokeOpacity="0.3" />
          <path
            d="M 10 9 L 10 25 M 10 9 L 17 9 Q 24 9 24 17 Q 24 25 17 25 L 10 25"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="square"
            strokeLinejoin="miter"
          />
          <circle cx="26" cy="9" r="1.6" fill="var(--gold)" />
        </svg>
        <span className="site-header__wordmark">David McGregor</span>
      </Link>
      <nav className="site-nav">
        <a href="/#work" data-cursor-label="Work">
          <span className="site-nav__count">01</span>Work
        </a>
        <a href="/#about" data-cursor-label="About">
          <span className="site-nav__count">02</span>About
        </a>
        <a href="/#ai" data-cursor-label="Practice">
          <span className="site-nav__count">03</span>Practice
        </a>
        <a href="/#contact" data-cursor-label="Say hi">
          <span className="site-nav__count">04</span>Contact
        </a>
      </nav>
    </header>
  );
}
