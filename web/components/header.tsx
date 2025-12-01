import Link from 'next/link'
import { Button } from '@/components/ui/button'

export function Header() {
  return (
    <header className="border-b">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold">
          Feature Kit
        </Link>
        <nav className="flex gap-4">
          <Link href="/">
            <Button variant="ghost">Home</Button>
          </Link>
          <Link href="/kits">
            <Button variant="ghost">Kits</Button>
          </Link>
          <Link href="/features">
            <Button variant="ghost">Features</Button>
          </Link>
        </nav>
      </div>
    </header>
  )
}

