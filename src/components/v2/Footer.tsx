export function V2Footer() {
  return (
    <footer className="site-footer">
      <div className="container site-footer__inner">
        <span>© {new Date().getFullYear()} David McGregor</span>
        <span>Portfolio v2 · Built with intent</span>
        <a href="#top" data-cursor-label="Top">
          Back to top ↑
        </a>
      </div>
    </footer>
  );
}
