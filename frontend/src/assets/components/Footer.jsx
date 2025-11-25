export default function Footer() {
  return (
    <footer className="footer bg-neutral text-neutral-content p-10 mt-10">
      <nav>
        <h6 className="footer-title">SokoPredicts</h6>
        <a className="link link-hover">Agriculture AI</a>
        <a className="link link-hover">Market Insights</a>
        <a className="link link-hover">Predictive Analytics</a>
      </nav>

      <nav>
        <h6 className="footer-title">Company</h6>
        <a className="link link-hover">About us</a>
        <a className="link link-hover">Team</a>
        <a className="link link-hover">Contact</a>
      </nav>

      <nav>
        <h6 className="footer-title">Legal</h6>
        <a className="link link-hover">Terms of use</a>
        <a className="link link-hover">Privacy policy</a>
      </nav>
    </footer>
  );
}
