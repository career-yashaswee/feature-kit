import Link from "next/link";
import { Button } from "@/components/ui/button";

export function Header() {
  return (
    <header className="border-b">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold">
          Feature Kit
        </Link>
        <nav className="flex gap-4">
          <nav className="flex gap-4">
            <Button variant="ghost" asChild>
              <Link href="/">Home</Link>
            </Button>
            <Button variant="ghost" asChild>
              <Link href="/kits">Kits</Link>
            </Button>
            <Button variant="ghost" asChild>
              <Link href="/features">Features</Link>
            </Button>
          </nav>
        </nav>
      </div>
    </header>
  );
}
