import { ThemeToggle } from './theme-toggler'

export default function Header() {
  return (
    <header className="p-4 flex justify-end">
      <ThemeToggle />
    </header>
  )
}
