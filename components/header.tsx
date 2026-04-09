import { ChevronDown, UserCircle2 } from "lucide-react";
import Link from "next/link";
import { Logo } from "./logo";

interface User {
  name: string;
  refId: string;
}

interface HeaderProps {
  isAuthenticated: boolean;
  user?: User;
}

interface UserDropdownProps {
  user: User;
}

const navItems = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "Exam", href: "/exam" }
];


function Navbar() {
  return (
    <nav className="flex items-center gap-8 lg:gap-12">
      <Logo />
      {navItems.map((item) => (
        <Link key={item.label} href={item.href} className="text-sm font-normal text-slate-800 hover:text-slate-600 transition-colors">
          {item.label}
        </Link>
      ))}
    </nav>
  );
}


function UserDropdown({ user }: UserDropdownProps) {
  return (
    <button
      type="button"
      className="flex items-center gap-2 rounded-full px-2 py-1 text-left transition-colors hover:bg-slate-50"
    >
      <UserCircle2 className="size-8 text-slate-300" strokeWidth={1.7} />
      <span className="hidden sm:flex sm:flex-col sm:items-start">
        <span className="text-sm font-semibold text-slate-700">{user.name}</span>
        <span className="text-xs font-medium text-slate-500">Ref. ID - {user.refId}</span>
      </span>
      <ChevronDown className="size-4 text-slate-500" />
    </button>
  );
}

export function Header({ isAuthenticated, user }: HeaderProps) {
  return (
    <header className="border-b border-slate-200 bg-white shadow-[0_8px_24px_rgba(15,23,42,0.05)]">
      <div className="mx-auto flex h-20 w-full max-w-[1280px] items-center justify-between px-4 sm:px-6 lg:px-8">
        <Navbar />

        {isAuthenticated && user && <UserDropdown user={user} />}
      </div>
    </header>
  );
}