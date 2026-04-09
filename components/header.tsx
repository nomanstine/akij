import { ChevronDown, UserCircle2 } from "lucide-react";

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
  { label: "Dashboard" }
];


function Logo() {
  return (
    <div className="flex items-end gap-1 leading-none">
      <span className="text-[30px] font-bold tracking-tight text-[#2F308C]">AKIJ</span>
      <span className="pb-1 text-sm font-semibold tracking-wide text-slate-900">RESOURCE</span>
    </div>
  );
}

function Navbar() {
  return (
    <nav className="flex items-center gap-8 lg:gap-12">
      <Logo />
      {navItems.map((item) => (
        <span key={item.label} className="text-sm font-normal text-slate-800">
          {item.label}
        </span>
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