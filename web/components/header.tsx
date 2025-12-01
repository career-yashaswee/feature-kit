import Link from "next/link";
import { Button } from "@/components/ui/button";

export function Header() {
  return (
    <header className="border-b">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold">
          Feature Kit
        </Link>
        <nav className="flex gap-4" aria-label="Main navigation">
          <Button variant="ghost" asChild>
            <Link href="/" aria-label="Home page">Home</Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link href="/kits" aria-label="Browse kits">Kits</Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link href="/features" aria-label="Browse all features">Features</Link>
          </Button>
        </nav>
      </div>
    </header>
  );
}
