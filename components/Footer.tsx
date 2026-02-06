import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full border-t border-black/10 dark:border-white/10 py-6 px-4 mt-auto">
      <div className="mx-auto text-sm text-foreground/70 text-center">
        <span>© {new Date().getFullYear()} rentrak</span>
      </div>
    </footer>
  );
}
