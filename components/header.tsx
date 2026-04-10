"use client";

import { UserCircle2, LogOut, ChevronDown } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Logo } from "./logo";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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
];


function Navbar() {
  return (
    <nav className="flex w-full gap-8 px-4 lg:px-6 lg:gap-12">
      {navItems.map((item) => (
        <Link key={item.label} href={item.href} className="text-sm font-normal text-slate-800 hover:text-slate-600 transition-colors">
          {item.label}
        </Link>
      ))}
    </nav>
  );
}


function UserDropdown({ user }: UserDropdownProps) {
  const router = useRouter();

  const handleLogout = () => {
    router.push("/");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex items-center gap-2 rounded-full px-2 py-1 text-left transition-colors hover:bg-slate-50">
          <UserCircle2 className="size-8 text-slate-300" strokeWidth={1.7} />
          <span className="hidden sm:flex sm:flex-col sm:items-start">
            <span className="text-sm font-semibold text-slate-700">{user.name}</span>
            <span className="text-xs font-medium text-slate-500">Ref. ID - {user.refId}</span>
          </span>
          <ChevronDown className="size-4 text-slate-500" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem disabled>
          <span className="text-sm">{user.name}</span>
        </DropdownMenuItem>
        <DropdownMenuItem disabled>
          <span className="text-xs text-slate-500">Ref. ID - {user.refId}</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout} className="text-red-600 focus:bg-red-50 focus:text-red-600">
          <LogOut className="mr-2 h-4 w-4" />
          <span>Logout</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function Header({ isAuthenticated, user }: HeaderProps) {
  return (
    <header className="border-b border-slate-200 bg-white shadow-lg">
      <div className="mx-auto flex h-20 w-full max-w-7xl items-center px-4 sm:px-6 lg:px-8">
        {isAuthenticated ? (
          <div className="flex w-full items-center justify-between">
            <Logo />
            <div className="flex-1 flex justify-center">
              <Navbar />
            </div>
            {user && <UserDropdown user={user} />}
          </div>
        ) : (
          <div className="flex w-full items-center">
            <Logo />
            <div className="flex-1 text-center text-3xl font-bold text-slate-800">Akij Resource</div>
          </div>
        )}
      </div>
    </header>
  );
}