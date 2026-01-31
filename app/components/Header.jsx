import Link from "next/link";

export default function Header() {
  return (
    <header style={{ padding: "20px", borderBottom: "1px solid #ddd" }}>
      <h2>VIVA Events</h2>
      <nav style={{ display: "flex", gap: "15px" }}>
        <Link href="/">Home</Link>
        <Link href="/about">About</Link>
        <Link href="/services">Services</Link>
        <Link href="/contact">Contact</Link>
      </nav>
    </header>
  );
}
