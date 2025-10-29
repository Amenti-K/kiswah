import Link from "next/link";

export function Navbar() {
  return (
    <nav className="flex justify-between p-4 bg-gray-200">
      <Link href="/">Home</Link>
      <div className="flex gap-4">
        <Link href="/about">About</Link>
        <Link href="/contact">Contact</Link>
        <Link href="/departments">Departments</Link>
        <Link href="/ventures">Ventures</Link>
        <Link href="/resources">Resources</Link>
        <Link href="/staff">Staff</Link>
        <Link href="/projects">Projects</Link>
        <Link href="/admin">Admin</Link>
      </div>
    </nav>
  );
}
