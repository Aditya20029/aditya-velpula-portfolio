export default function Footer() {
  return (
    <footer className="py-8 px-4 text-center relative z-10">
      <div className="t-mono-sm text-[var(--text-ghost)]">
        © {new Date().getFullYear()} Aditya Velpula · Engineered with React + Framer Motion
      </div>
    </footer>
  );
}
